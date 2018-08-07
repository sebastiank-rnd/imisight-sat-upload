#!/bin/bash
set -e

#run confd
confd -onetime -backend ${CONFD_BACKEND:-env}

#run app
echo "Running application"

ng serve --host 0.0.0.0 --port 4200 --disableHostCheck
