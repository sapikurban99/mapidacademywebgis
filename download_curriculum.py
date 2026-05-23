import urllib.request
import os

url = "https://drive.google.com/uc?export=download&id=1L17Fh67BGlbCHLLh0jnPI0hpN4N71vBE"
output_path = r"d:\RIZALDY\Workingclass COCK\MAPID Fulltime\MAPID Academy WebGIS\Dashboard Peserta\public\Detailed_Curriculum_Batch_3.png"

print("Downloading file from:", url)
try:
    urllib.request.urlretrieve(url, output_path)
    print("Download successful! File saved to:", output_path)
    print("File size:", os.path.getsize(output_path), "bytes")
except Exception as e:
    print("Error downloading file:", e)
