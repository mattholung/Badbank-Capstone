import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";
import * as path from "path";
import * as fs from "fs";
import * as mime from "mime";


const contentBucket = new aws.s3.Bucket("bad-bank-website",
        {
            bucket: "bad-bank-website",
            website: {
                indexDocument: "index.html",
                
            },
            acl: aws.s3.PublicReadAcl,
            forceDestroy: true,

        });

    const webContentsRootPath = path.join(process.cwd(), "../public");
    putContents(contentBucket, webContentsRootPath);


// Upload website content to s3 bucket.
function putContents(bucket: aws.s3.Bucket, rootDir: string) {

    function crawlDirectory(dir: string, f: (_: string) => void) {
        const files = fs.readdirSync(dir);
        for (const file of files) {
            const filePath = `${dir}/${file}`;
            const stat = fs.statSync(filePath);
            if (stat.isDirectory()) {
                crawlDirectory(filePath, f);
            }
            if (stat.isFile()) {
                f(filePath);
            }
        }
    }

    pulumi.log.info(`Syncing contents from local disk at ${rootDir}.`);
    crawlDirectory(
        rootDir,
        (filePath: string) => {
            const relativeFilePath = filePath.replace(rootDir + "/", "");
            const contentFile = new aws.s3.BucketObject(
                relativeFilePath,
                {
                    key: relativeFilePath,

                    acl: "public-read",
                    bucket: bucket,
                    contentType: mime.getType(filePath) || undefined,
                    source: new pulumi.asset.FileAsset(filePath),
                },
                {
                    parent: bucket,
                });
        });
}

export const websiteURL = contentBucket.websiteEndpoint;