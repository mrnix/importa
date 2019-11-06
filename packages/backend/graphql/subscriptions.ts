// tslint:disable
// this is an auto generated file. This will be overwritten

export const onCreateFile = `subscription OnCreateFile($owner: String!) {
  onCreateFile(owner: $owner) {
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
export const onUpdateFile = `subscription OnUpdateFile($owner: String!) {
  onUpdateFile(owner: $owner) {
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
export const onDeleteFile = `subscription OnDeleteFile($owner: String!) {
  onDeleteFile(owner: $owner) {
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
export const onCreateAlbum = `subscription OnCreateAlbum($owner: String!) {
  onCreateAlbum(owner: $owner) {
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
export const onUpdateAlbum = `subscription OnUpdateAlbum($owner: String!) {
  onUpdateAlbum(owner: $owner) {
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
export const onDeleteAlbum = `subscription OnDeleteAlbum($owner: String!) {
  onDeleteAlbum(owner: $owner) {
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
export const onCreateExport = `subscription OnCreateExport($owner: String!) {
  onCreateExport(owner: $owner) {
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
export const onUpdateExport = `subscription OnUpdateExport($owner: String!) {
  onUpdateExport(owner: $owner) {
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
export const onDeleteExport = `subscription OnDeleteExport($owner: String!) {
  onDeleteExport(owner: $owner) {
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
export const onCreateReview = `subscription OnCreateReview($owner: String!) {
  onCreateReview(owner: $owner) {
    id
    createdAt
    identityId
    fileId
    resume
    owner
  }
}
`;
export const onUpdateReview = `subscription OnUpdateReview($owner: String!) {
  onUpdateReview(owner: $owner) {
    id
    createdAt
    identityId
    fileId
    resume
    owner
  }
}
`;
export const onDeleteReview = `subscription OnDeleteReview($owner: String!) {
  onDeleteReview(owner: $owner) {
    id
    createdAt
    identityId
    fileId
    resume
    owner
  }
}
`;
