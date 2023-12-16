const core = require('@actions/core');
const github = require('@actions/github');
const exec = require('@actions/exec');

function run() {
	const bucket = core.getInput('bucket', { required: true });
	const bucketRegion = core.getInput('bucket-region', { required: true });
	const distDoler = core.getInput('dist-folder', { required: true });

	const s3Uri = `s3://${bucket}`;
	exec.exec(`aws s3 sync ${distDoler} ${s3Uri} --region ${bucketRegion}`);

	const websiteURL = `http://${bucket}.s3-website-${bucketRegion}.amazon.com`;
  core.setOutput('website-url', websiteURL)
}

run();
