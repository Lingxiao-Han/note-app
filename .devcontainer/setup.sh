#!/bin/bash
set -e

DESIRED_VERSION="4.15.0-0.okd-2024-03-10-010116"

if command -v sudo >/dev/null 2>&1; then
  SUDO='sudo'
else
  SUDO=''
fi

arch="$(arch)"
case "$arch" in 
    x86_64) TARGET="" ;;
    aarch64) TARGET="arm64-" ;;
esac


OC_URL="https://github.com/okd-project/okd/releases/download/${DESIRED_VERSION}/openshift-client-linux-${TARGET}${DESIRED_VERSION}.tar.gz"
echo "开始下载 oc CLI：$OC_URL"
wget -O /tmp/oc.tgz "$OC_URL"
pushd /tmp
tar -xvzf oc.tgz
$SUDO mv oc /usr/bin/oc
rm -f oc.tgz README.md kubectl
popd
cd server && npm install && cd ../client && npm install && npm install axios

