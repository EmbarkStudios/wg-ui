#!/bin/sh

set -eux

# need `SYS_ADMIN` and `NET_ADMIN` capabilities.
mkdir -p /dev/net
TUNFILE=/dev/net/tun
[ ! -c $TUNFILE ] && mknod $TUNFILE c 10 200

# Start the first process
./wireguard-go wg0
status=$?
if [ $status -ne 0 ]; then
  echo "Failed to start wireguard-go: $status"
  exit $status
fi

# Start the second process
./wireguard-ui $@
status=$?
if [ $status -ne 0 ]; then
  echo "Failed to start wireguard-ui: $status"
  exit $status
fi

# Naive check runs checks once a minute to see if either of the processes exited.
# This illustrates part of the heavy lifting you need to do if you want to run
# more than one service in a container. The container exits with an error
# if it detects that either of the processes has exited.
# Otherwise it loops forever, waking up every 60 seconds

while sleep 60; do
  ps aux |grep wireguard-go |grep -q -v grep
  PROCESS_1_STATUS=$?
  ps aux |grep wireguard-ui |grep -q -v grep
  PROCESS_2_STATUS=$?
  # If the greps above find anything, they exit with 0 status
  # If they are not both 0, then something is wrong
  if [ $PROCESS_1_STATUS -ne 0 -o $PROCESS_2_STATUS -ne 0 ]; then
    echo "One of the processes has already exited."
    exit 1
  fi
done
