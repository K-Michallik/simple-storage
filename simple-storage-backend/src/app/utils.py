#!/usr/bin/env python3
import os
import uuid
import pathlib


def writeDataToFile(fileName : pathlib.Path, data):
    randomFilePath = fileName.parent / str(uuid.uuid4()) # place tmp file adjacent to target file, so they are on same FS

    with open(randomFilePath, 'w') as f:
        f.write(data)
        os.fsync(f.fileno())

        os.rename(f.name,  fileName)

        dirFd = os.open(fileName.parent, flags=os.O_RDONLY) # get file descriptor of the directory in which 'fileName' resides.
        os.fsync(dirFd)
        os.close(dirFd)
