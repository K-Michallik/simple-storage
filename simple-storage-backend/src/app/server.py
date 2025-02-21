from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import uvicorn
import pathlib
from utils import writeDataToFile


app = FastAPI()

class WriteRequest(BaseModel):
    text: str

@app.get("/")
def read_root():
    return "Welcome to the FastAPI server!"


@app.post("/write")
def write_text(request: WriteRequest):
    base_path = pathlib.Path(__file__).parent
    
    # Build the path to the storage directory and ensure it exists.
    storage_dir = base_path / "data" / "persistent" / "simplestorage"
    storage_dir.mkdir(parents=True, exist_ok=True)
    
    # Define the target file path.
    target_file = storage_dir / "sample_text.txt"
    
    try:
        # Use the utility function to safely write the data. For more info, read the "Persisting Data" section of the docs.
        writeDataToFile(target_file, request.text)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
    return {"message": "Data written successfully!"}


@app.get("/read")
def read_text():
    base_path = pathlib.Path(__file__).parent
    
    # Build the path to the storage directory and the target file.
    storage_dir = base_path / "data" / "persistent" / "simplestorage"
    target_file = storage_dir / "sample_text.txt"
    
    # Check if the file exists; if not, return a 404 error.
    if not target_file.exists():
        raise HTTPException(status_code=404, detail="File not found")
    
    # Attempt to read the file contents.
    try:
        contents = target_file.read_text()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
    return {"contents": contents}



if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=51600)
