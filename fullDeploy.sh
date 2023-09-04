pushd handler && npm run build; popd

if [ $? -ne 0 ]; then
  echo "There was an error building the handler package. Stopping deployment"
fi

pushd infra && cdk bootstrap && cdk deploy; popd

if [ $? -ne 0 ]; then
  echo "There was an error deploying the AWS resources. Please refer to the CDK or CFN logs"
fi
