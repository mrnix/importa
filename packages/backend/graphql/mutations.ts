// tslint:disable
// this is an auto generated file. This will be overwritten

export const createFile = `mutation CreateFile($input: CreateFileInput!) {
  createFile(input: $input) {
    id
    hash
    key
    mime
    meta
    thumb
    size
    owner
    album {
      id
      name
      identityId
      files {
        nextToken
      }
      owner
      export {
        id
        owner
      }
    }
  }
}
`;
export const updateFile = `mutation UpdateFile($input: UpdateFileInput!) {
  updateFile(input: $input) {
    id
    hash
    key
    mime
    meta
    thumb
    size
    owner
    album {
      id
      name
      identityId
      files {
        nextToken
      }
      owner
      export {
        id
        owner
      }
    }
  }
}
`;
export const deleteFile = `mutation DeleteFile($input: DeleteFileInput!) {
  deleteFile(input: $input) {
    id
    hash
    key
    mime
    meta
    thumb
    size
    owner
    album {
      id
      name
      identityId
      files {
        nextToken
      }
      owner
      export {
        id
        owner
      }
    }
  }
}
`;
export const createAlbum = `mutation CreateAlbum($input: CreateAlbumInput!) {
  createAlbum(input: $input) {
    id
    name
    identityId
    files {
      items {
        id
        hash
        key
        mime
        meta
        thumb
        size
        owner
      }
      nextToken
    }
    owner
    export {
      id
      album {
        id
        name
        identityId
        owner
      }
      owner
    }
  }
}
`;
export const updateAlbum = `mutation UpdateAlbum($input: UpdateAlbumInput!) {
  updateAlbum(input: $input) {
    id
    name
    identityId
    files {
      items {
        id
        hash
        key
        mime
        meta
        thumb
        size
        owner
      }
      nextToken
    }
    owner
    export {
      id
      album {
        id
        name
        identityId
        owner
      }
      owner
    }
  }
}
`;
export const deleteAlbum = `mutation DeleteAlbum($input: DeleteAlbumInput!) {
  deleteAlbum(input: $input) {
    id
    name
    identityId
    files {
      items {
        id
        hash
        key
        mime
        meta
        thumb
        size
        owner
      }
      nextToken
    }
    owner
    export {
      id
      album {
        id
        name
        identityId
        owner
      }
      owner
    }
  }
}
`;
export const createExport = `mutation CreateExport($input: CreateExportInput!) {
  createExport(input: $input) {
    id
    album {
      id
      name
      identityId
      files {
        nextToken
      }
      owner
      export {
        id
        owner
      }
    }
    owner
  }
}
`;
export const updateExport = `mutation UpdateExport($input: UpdateExportInput!) {
  updateExport(input: $input) {
    id
    album {
      id
      name
      identityId
      files {
        nextToken
      }
      owner
      export {
        id
        owner
      }
    }
    owner
  }
}
`;
export const deleteExport = `mutation DeleteExport($input: DeleteExportInput!) {
  deleteExport(input: $input) {
    id
    album {
      id
      name
      identityId
      files {
        nextToken
      }
      owner
      export {
        id
        owner
      }
    }
    owner
  }
}
`;
export const createReview = `mutation CreateReview($input: CreateReviewInput!) {
  createReview(input: $input) {
    id
    createdAt
    identityId
    fileId
    resume
    owner
  }
}
`;
export const updateReview = `mutation UpdateReview($input: UpdateReviewInput!) {
  updateReview(input: $input) {
    id
    createdAt
    identityId
    fileId
    resume
    owner
  }
}
`;
export const deleteReview = `mutation DeleteReview($input: DeleteReviewInput!) {
  deleteReview(input: $input) {
    id
    createdAt
    identityId
    fileId
    resume
    owner
  }
}
`;
