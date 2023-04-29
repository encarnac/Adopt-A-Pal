from google.cloud import storage


def upload_pic(bucket_name, source_file_name, destination_blob_name):
    """Uploads a file to the bucket."""
    # The ID of your GCS bucket
    # bucket_name = "your-bucket-name"
    # The path to your file to upload
    # source_file_name = "local/path/to/file"
    # The ID of your GCS object
    # destination_blob_name = "storage-object-name"

    storage_client = storage.Client()
    bucket = storage_client.bucket(bucket_name)
    blob = bucket.blob(destination_blob_name)

    # Optional: set a generation-match precondition to avoid potential race conditions
    # and data corruptions. The request to upload is aborted if the object's
    # generation number does not match your precondition. For a destination
    # object that does not yet exist, set the if_generation_match precondition to 0.
    # If the destination object already exists in your bucket, set instead a
    # generation-match precondition using its generation number.
    generation_match_precondition = 0

    blob.upload_from_filename(source_file_name, if_generation_match=generation_match_precondition)

    print(
        f"File {source_file_name} uploaded to {destination_blob_name}."
    )

def bucket_metadata(bucket_name):
    """Prints out a bucket's metadata."""
    # bucket_name = 'your-bucket-name'

    storage_client = storage.Client()
    bucket = storage_client.get_bucket(bucket_name)

    print(f"ID: {bucket.id}")
    print(f"Name: {bucket.name}")
    print(f"Storage Class: {bucket.storage_class}")
    print(f"Location: {bucket.location}")
    print(f"Location Type: {bucket.location_type}")
    print(f"Cors: {bucket.cors}")
    print(f"Default Event Based Hold: {bucket.default_event_based_hold}")
    print(f"Default KMS Key Name: {bucket.default_kms_key_name}")
    print(f"Metageneration: {bucket.metageneration}")
    print(
        f"Public Access Prevention: {bucket.iam_configuration.public_access_prevention}"
    )
    print(f"Retention Effective Time: {bucket.retention_policy_effective_time}")
    print(f"Retention Period: {bucket.retention_period}")
    print(f"Retention Policy Locked: {bucket.retention_policy_locked}")
    print(f"Requester Pays: {bucket.requester_pays}")
    print(f"Self Link: {bucket.self_link}")
    print(f"Time Created: {bucket.time_created}")
    print(f"Versioning Enabled: {bucket.versioning_enabled}")
    print(f"Labels: {bucket.labels}")
