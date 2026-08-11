import json

import boto3
from botocore.exceptions import ClientError

from app.config import settings


class S3StorageService:

    def __init__(self):
        if not settings.AWS_ACCESS_KEY_ID:
            raise RuntimeError(
                "AWS_ACCESS_KEY_ID is not configured"
            )

        if not settings.AWS_SECRET_ACCESS_KEY:
            raise RuntimeError(
                "AWS_SECRET_ACCESS_KEY is not configured"
            )

        if not settings.S3_BUCKET_NAME:
            raise RuntimeError(
                "S3_BUCKET_NAME is not configured"
            )

        self.client = boto3.client(
            "s3",
            region_name=settings.AWS_REGION,
            aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
            aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
        )

        self.bucket = settings.S3_BUCKET_NAME

    def upload_json(self, filename: str, data: dict) -> None:

        self.client.put_object(
            Bucket=self.bucket,
            Key=filename,
            Body=json.dumps(data),
            ContentType="application/json",
        )

    def list_files(self) -> list:

        paginator = self.client.get_paginator(
            "list_objects_v2"
        )

        files = []

        for page in paginator.paginate(
            Bucket=self.bucket
        ):
            for obj in page.get("Contents", []):

                files.append(
                    {
                        "name": obj["Key"],
                        "size": obj["Size"],
                        "created_at": obj["LastModified"].isoformat(),
                    }
                )

        return files

    def get_file(self, filename: str):

        try:

            response = self.client.get_object(
                Bucket=self.bucket,
                Key=filename,
            )

            content = response["Body"].read()

            return json.loads(content)

        except ClientError as error:

            error_code = error.response["Error"]["Code"]

            if error_code in ("NoSuchKey", "404"):
                return None

            raise