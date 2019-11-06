/* tslint:disable */
//  This file was automatically generated and should not be edited.

export type CreateFileInput = {
  id?: string | null,
  hash?: string | null,
  key: string,
  mime: string,
  meta?: string | null,
  thumb?: string | null,
  fileAlbumId?: string | null,
};

export enum ReviewResume {
  like = "like",
  dislike = "dislike",
}


export type UpdateFileInput = {
  id: string,
  hash?: string | null,
  key?: string | null,
  mime?: string | null,
  meta?: string | null,
  thumb?: string | null,
  fileAlbumId?: string | null,
};

export type DeleteFileInput = {
  id?: string | null,
};

export type CreateAlbumInput = {
  id?: string | null,
  name?: string | null,
  createdAt: string,
  identityId?: string | null,
  albumExportId?: string | null,
};

export type UpdateAlbumInput = {
  id: string,
  name?: string | null,
  createdAt?: string | null,
  identityId?: string | null,
  albumExportId?: string | null,
};

export type DeleteAlbumInput = {
  id?: string | null,
};

export type CreateExportInput = {
  id?: string | null,
  exportAlbumId?: string | null,
};

export type UpdateExportInput = {
  id: string,
  exportAlbumId?: string | null,
};

export type DeleteExportInput = {
  id?: string | null,
};

export type CreateReviewInput = {
  id?: string | null,
  identityId?: string | null,
  resume?: ReviewResume | null,
  reviewFileId?: string | null,
};

export type UpdateReviewInput = {
  id: string,
  identityId?: string | null,
  resume?: ReviewResume | null,
  reviewFileId?: string | null,
};

export type DeleteReviewInput = {
  id?: string | null,
};

export type ModelFileFilterInput = {
  id?: ModelIDFilterInput | null,
  hash?: ModelStringFilterInput | null,
  key?: ModelStringFilterInput | null,
  mime?: ModelStringFilterInput | null,
  meta?: ModelStringFilterInput | null,
  thumb?: ModelStringFilterInput | null,
  and?: Array< ModelFileFilterInput | null > | null,
  or?: Array< ModelFileFilterInput | null > | null,
  not?: ModelFileFilterInput | null,
};

export type ModelIDFilterInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type ModelStringFilterInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type ModelAlbumFilterInput = {
  id?: ModelIDFilterInput | null,
  name?: ModelStringFilterInput | null,
  createdAt?: ModelStringFilterInput | null,
  identityId?: ModelStringFilterInput | null,
  and?: Array< ModelAlbumFilterInput | null > | null,
  or?: Array< ModelAlbumFilterInput | null > | null,
  not?: ModelAlbumFilterInput | null,
};

export type ModelExportFilterInput = {
  id?: ModelStringFilterInput | null,
  and?: Array< ModelExportFilterInput | null > | null,
  or?: Array< ModelExportFilterInput | null > | null,
  not?: ModelExportFilterInput | null,
};

export type ModelReviewFilterInput = {
  id?: ModelIDFilterInput | null,
  identityId?: ModelStringFilterInput | null,
  resume?: ModelReviewResumeFilterInput | null,
  and?: Array< ModelReviewFilterInput | null > | null,
  or?: Array< ModelReviewFilterInput | null > | null,
  not?: ModelReviewFilterInput | null,
};

export type ModelReviewResumeFilterInput = {
  eq?: ReviewResume | null,
  ne?: ReviewResume | null,
};

export type CreateFileMutationVariables = {
  input: CreateFileInput,
};

export type CreateFileMutation = {
  createFile:  {
    __typename: "File",
    id: string,
    hash: string | null,
    key: string,
    mime: string,
    meta: string | null,
    thumb: string | null,
    owner: string | null,
    album:  {
      __typename: "Album",
      id: string,
      name: string | null,
      createdAt: string,
      identityId: string | null,
      files:  {
        __typename: "ModelFileConnection",
        nextToken: string | null,
      } | null,
      owner: string | null,
      export:  {
        __typename: "Export",
        id: string,
        owner: string | null,
      } | null,
    } | null,
    reviews:  {
      __typename: "ModelReviewConnection",
      items:  Array< {
        __typename: "Review",
        id: string,
        identityId: string | null,
        resume: ReviewResume | null,
        owner: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type UpdateFileMutationVariables = {
  input: UpdateFileInput,
};

export type UpdateFileMutation = {
  updateFile:  {
    __typename: "File",
    id: string,
    hash: string | null,
    key: string,
    mime: string,
    meta: string | null,
    thumb: string | null,
    owner: string | null,
    album:  {
      __typename: "Album",
      id: string,
      name: string | null,
      createdAt: string,
      identityId: string | null,
      files:  {
        __typename: "ModelFileConnection",
        nextToken: string | null,
      } | null,
      owner: string | null,
      export:  {
        __typename: "Export",
        id: string,
        owner: string | null,
      } | null,
    } | null,
    reviews:  {
      __typename: "ModelReviewConnection",
      items:  Array< {
        __typename: "Review",
        id: string,
        identityId: string | null,
        resume: ReviewResume | null,
        owner: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type DeleteFileMutationVariables = {
  input: DeleteFileInput,
};

export type DeleteFileMutation = {
  deleteFile:  {
    __typename: "File",
    id: string,
    hash: string | null,
    key: string,
    mime: string,
    meta: string | null,
    thumb: string | null,
    owner: string | null,
    album:  {
      __typename: "Album",
      id: string,
      name: string | null,
      createdAt: string,
      identityId: string | null,
      files:  {
        __typename: "ModelFileConnection",
        nextToken: string | null,
      } | null,
      owner: string | null,
      export:  {
        __typename: "Export",
        id: string,
        owner: string | null,
      } | null,
    } | null,
    reviews:  {
      __typename: "ModelReviewConnection",
      items:  Array< {
        __typename: "Review",
        id: string,
        identityId: string | null,
        resume: ReviewResume | null,
        owner: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type CreateAlbumMutationVariables = {
  input: CreateAlbumInput,
};

export type CreateAlbumMutation = {
  createAlbum:  {
    __typename: "Album",
    id: string,
    name: string | null,
    createdAt: string,
    identityId: string | null,
    files:  {
      __typename: "ModelFileConnection",
      items:  Array< {
        __typename: "File",
        id: string,
        hash: string | null,
        key: string,
        mime: string,
        meta: string | null,
        thumb: string | null,
        owner: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    owner: string | null,
    export:  {
      __typename: "Export",
      id: string,
      album:  {
        __typename: "Album",
        id: string,
        name: string | null,
        createdAt: string,
        identityId: string | null,
        owner: string | null,
      } | null,
      owner: string | null,
    } | null,
  } | null,
};

export type UpdateAlbumMutationVariables = {
  input: UpdateAlbumInput,
};

export type UpdateAlbumMutation = {
  updateAlbum:  {
    __typename: "Album",
    id: string,
    name: string | null,
    createdAt: string,
    identityId: string | null,
    files:  {
      __typename: "ModelFileConnection",
      items:  Array< {
        __typename: "File",
        id: string,
        hash: string | null,
        key: string,
        mime: string,
        meta: string | null,
        thumb: string | null,
        owner: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    owner: string | null,
    export:  {
      __typename: "Export",
      id: string,
      album:  {
        __typename: "Album",
        id: string,
        name: string | null,
        createdAt: string,
        identityId: string | null,
        owner: string | null,
      } | null,
      owner: string | null,
    } | null,
  } | null,
};

export type DeleteAlbumMutationVariables = {
  input: DeleteAlbumInput,
};

export type DeleteAlbumMutation = {
  deleteAlbum:  {
    __typename: "Album",
    id: string,
    name: string | null,
    createdAt: string,
    identityId: string | null,
    files:  {
      __typename: "ModelFileConnection",
      items:  Array< {
        __typename: "File",
        id: string,
        hash: string | null,
        key: string,
        mime: string,
        meta: string | null,
        thumb: string | null,
        owner: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    owner: string | null,
    export:  {
      __typename: "Export",
      id: string,
      album:  {
        __typename: "Album",
        id: string,
        name: string | null,
        createdAt: string,
        identityId: string | null,
        owner: string | null,
      } | null,
      owner: string | null,
    } | null,
  } | null,
};

export type CreateExportMutationVariables = {
  input: CreateExportInput,
};

export type CreateExportMutation = {
  createExport:  {
    __typename: "Export",
    id: string,
    album:  {
      __typename: "Album",
      id: string,
      name: string | null,
      createdAt: string,
      identityId: string | null,
      files:  {
        __typename: "ModelFileConnection",
        nextToken: string | null,
      } | null,
      owner: string | null,
      export:  {
        __typename: "Export",
        id: string,
        owner: string | null,
      } | null,
    } | null,
    owner: string | null,
  } | null,
};

export type UpdateExportMutationVariables = {
  input: UpdateExportInput,
};

export type UpdateExportMutation = {
  updateExport:  {
    __typename: "Export",
    id: string,
    album:  {
      __typename: "Album",
      id: string,
      name: string | null,
      createdAt: string,
      identityId: string | null,
      files:  {
        __typename: "ModelFileConnection",
        nextToken: string | null,
      } | null,
      owner: string | null,
      export:  {
        __typename: "Export",
        id: string,
        owner: string | null,
      } | null,
    } | null,
    owner: string | null,
  } | null,
};

export type DeleteExportMutationVariables = {
  input: DeleteExportInput,
};

export type DeleteExportMutation = {
  deleteExport:  {
    __typename: "Export",
    id: string,
    album:  {
      __typename: "Album",
      id: string,
      name: string | null,
      createdAt: string,
      identityId: string | null,
      files:  {
        __typename: "ModelFileConnection",
        nextToken: string | null,
      } | null,
      owner: string | null,
      export:  {
        __typename: "Export",
        id: string,
        owner: string | null,
      } | null,
    } | null,
    owner: string | null,
  } | null,
};

export type CreateReviewMutationVariables = {
  input: CreateReviewInput,
};

export type CreateReviewMutation = {
  createReview:  {
    __typename: "Review",
    id: string,
    identityId: string | null,
    resume: ReviewResume | null,
    file:  {
      __typename: "File",
      id: string,
      hash: string | null,
      key: string,
      mime: string,
      meta: string | null,
      thumb: string | null,
      owner: string | null,
      album:  {
        __typename: "Album",
        id: string,
        name: string | null,
        createdAt: string,
        identityId: string | null,
        owner: string | null,
      } | null,
      reviews:  {
        __typename: "ModelReviewConnection",
        nextToken: string | null,
      } | null,
    } | null,
    owner: string | null,
  } | null,
};

export type UpdateReviewMutationVariables = {
  input: UpdateReviewInput,
};

export type UpdateReviewMutation = {
  updateReview:  {
    __typename: "Review",
    id: string,
    identityId: string | null,
    resume: ReviewResume | null,
    file:  {
      __typename: "File",
      id: string,
      hash: string | null,
      key: string,
      mime: string,
      meta: string | null,
      thumb: string | null,
      owner: string | null,
      album:  {
        __typename: "Album",
        id: string,
        name: string | null,
        createdAt: string,
        identityId: string | null,
        owner: string | null,
      } | null,
      reviews:  {
        __typename: "ModelReviewConnection",
        nextToken: string | null,
      } | null,
    } | null,
    owner: string | null,
  } | null,
};

export type DeleteReviewMutationVariables = {
  input: DeleteReviewInput,
};

export type DeleteReviewMutation = {
  deleteReview:  {
    __typename: "Review",
    id: string,
    identityId: string | null,
    resume: ReviewResume | null,
    file:  {
      __typename: "File",
      id: string,
      hash: string | null,
      key: string,
      mime: string,
      meta: string | null,
      thumb: string | null,
      owner: string | null,
      album:  {
        __typename: "Album",
        id: string,
        name: string | null,
        createdAt: string,
        identityId: string | null,
        owner: string | null,
      } | null,
      reviews:  {
        __typename: "ModelReviewConnection",
        nextToken: string | null,
      } | null,
    } | null,
    owner: string | null,
  } | null,
};

export type ListFilesQueryVariables = {
  filter?: ModelFileFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListFilesQuery = {
  listFiles:  {
    __typename: "ModelFileConnection",
    items:  Array< {
      __typename: "File",
      id: string,
      hash: string | null,
      key: string,
      mime: string,
      meta: string | null,
      thumb: string | null,
      owner: string | null,
      album:  {
        __typename: "Album",
        id: string,
        name: string | null,
        createdAt: string,
        identityId: string | null,
        owner: string | null,
      } | null,
      reviews:  {
        __typename: "ModelReviewConnection",
        nextToken: string | null,
      } | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetFileQueryVariables = {
  id: string,
};

export type GetFileQuery = {
  getFile:  {
    __typename: "File",
    id: string,
    hash: string | null,
    key: string,
    mime: string,
    meta: string | null,
    thumb: string | null,
    owner: string | null,
    album:  {
      __typename: "Album",
      id: string,
      name: string | null,
      createdAt: string,
      identityId: string | null,
      files:  {
        __typename: "ModelFileConnection",
        nextToken: string | null,
      } | null,
      owner: string | null,
      export:  {
        __typename: "Export",
        id: string,
        owner: string | null,
      } | null,
    } | null,
    reviews:  {
      __typename: "ModelReviewConnection",
      items:  Array< {
        __typename: "Review",
        id: string,
        identityId: string | null,
        resume: ReviewResume | null,
        owner: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type ListAlbumsQueryVariables = {
  filter?: ModelAlbumFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListAlbumsQuery = {
  listAlbums:  {
    __typename: "ModelAlbumConnection",
    items:  Array< {
      __typename: "Album",
      id: string,
      name: string | null,
      createdAt: string,
      identityId: string | null,
      files:  {
        __typename: "ModelFileConnection",
        nextToken: string | null,
      } | null,
      owner: string | null,
      export:  {
        __typename: "Export",
        id: string,
        owner: string | null,
      } | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetAlbumQueryVariables = {
  id: string,
};

export type GetAlbumQuery = {
  getAlbum:  {
    __typename: "Album",
    id: string,
    name: string | null,
    createdAt: string,
    identityId: string | null,
    files:  {
      __typename: "ModelFileConnection",
      items:  Array< {
        __typename: "File",
        id: string,
        hash: string | null,
        key: string,
        mime: string,
        meta: string | null,
        thumb: string | null,
        owner: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    owner: string | null,
    export:  {
      __typename: "Export",
      id: string,
      album:  {
        __typename: "Album",
        id: string,
        name: string | null,
        createdAt: string,
        identityId: string | null,
        owner: string | null,
      } | null,
      owner: string | null,
    } | null,
  } | null,
};

export type ListExportsQueryVariables = {
  filter?: ModelExportFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListExportsQuery = {
  listExports:  {
    __typename: "ModelExportConnection",
    items:  Array< {
      __typename: "Export",
      id: string,
      album:  {
        __typename: "Album",
        id: string,
        name: string | null,
        createdAt: string,
        identityId: string | null,
        owner: string | null,
      } | null,
      owner: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetExportQueryVariables = {
  id: string,
};

export type GetExportQuery = {
  getExport:  {
    __typename: "Export",
    id: string,
    album:  {
      __typename: "Album",
      id: string,
      name: string | null,
      createdAt: string,
      identityId: string | null,
      files:  {
        __typename: "ModelFileConnection",
        nextToken: string | null,
      } | null,
      owner: string | null,
      export:  {
        __typename: "Export",
        id: string,
        owner: string | null,
      } | null,
    } | null,
    owner: string | null,
  } | null,
};

export type GetReviewQueryVariables = {
  id: string,
};

export type GetReviewQuery = {
  getReview:  {
    __typename: "Review",
    id: string,
    identityId: string | null,
    resume: ReviewResume | null,
    file:  {
      __typename: "File",
      id: string,
      hash: string | null,
      key: string,
      mime: string,
      meta: string | null,
      thumb: string | null,
      owner: string | null,
      album:  {
        __typename: "Album",
        id: string,
        name: string | null,
        createdAt: string,
        identityId: string | null,
        owner: string | null,
      } | null,
      reviews:  {
        __typename: "ModelReviewConnection",
        nextToken: string | null,
      } | null,
    } | null,
    owner: string | null,
  } | null,
};

export type ListReviewsQueryVariables = {
  filter?: ModelReviewFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListReviewsQuery = {
  listReviews:  {
    __typename: "ModelReviewConnection",
    items:  Array< {
      __typename: "Review",
      id: string,
      identityId: string | null,
      resume: ReviewResume | null,
      file:  {
        __typename: "File",
        id: string,
        hash: string | null,
        key: string,
        mime: string,
        meta: string | null,
        thumb: string | null,
        owner: string | null,
      } | null,
      owner: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnCreateFileSubscriptionVariables = {
  owner: string,
};

export type OnCreateFileSubscription = {
  onCreateFile:  {
    __typename: "File",
    id: string,
    hash: string | null,
    key: string,
    mime: string,
    meta: string | null,
    thumb: string | null,
    owner: string | null,
    album:  {
      __typename: "Album",
      id: string,
      name: string | null,
      createdAt: string,
      identityId: string | null,
      files:  {
        __typename: "ModelFileConnection",
        nextToken: string | null,
      } | null,
      owner: string | null,
      export:  {
        __typename: "Export",
        id: string,
        owner: string | null,
      } | null,
    } | null,
    reviews:  {
      __typename: "ModelReviewConnection",
      items:  Array< {
        __typename: "Review",
        id: string,
        identityId: string | null,
        resume: ReviewResume | null,
        owner: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnUpdateFileSubscriptionVariables = {
  owner: string,
};

export type OnUpdateFileSubscription = {
  onUpdateFile:  {
    __typename: "File",
    id: string,
    hash: string | null,
    key: string,
    mime: string,
    meta: string | null,
    thumb: string | null,
    owner: string | null,
    album:  {
      __typename: "Album",
      id: string,
      name: string | null,
      createdAt: string,
      identityId: string | null,
      files:  {
        __typename: "ModelFileConnection",
        nextToken: string | null,
      } | null,
      owner: string | null,
      export:  {
        __typename: "Export",
        id: string,
        owner: string | null,
      } | null,
    } | null,
    reviews:  {
      __typename: "ModelReviewConnection",
      items:  Array< {
        __typename: "Review",
        id: string,
        identityId: string | null,
        resume: ReviewResume | null,
        owner: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnDeleteFileSubscriptionVariables = {
  owner: string,
};

export type OnDeleteFileSubscription = {
  onDeleteFile:  {
    __typename: "File",
    id: string,
    hash: string | null,
    key: string,
    mime: string,
    meta: string | null,
    thumb: string | null,
    owner: string | null,
    album:  {
      __typename: "Album",
      id: string,
      name: string | null,
      createdAt: string,
      identityId: string | null,
      files:  {
        __typename: "ModelFileConnection",
        nextToken: string | null,
      } | null,
      owner: string | null,
      export:  {
        __typename: "Export",
        id: string,
        owner: string | null,
      } | null,
    } | null,
    reviews:  {
      __typename: "ModelReviewConnection",
      items:  Array< {
        __typename: "Review",
        id: string,
        identityId: string | null,
        resume: ReviewResume | null,
        owner: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnCreateAlbumSubscriptionVariables = {
  owner: string,
};

export type OnCreateAlbumSubscription = {
  onCreateAlbum:  {
    __typename: "Album",
    id: string,
    name: string | null,
    createdAt: string,
    identityId: string | null,
    files:  {
      __typename: "ModelFileConnection",
      items:  Array< {
        __typename: "File",
        id: string,
        hash: string | null,
        key: string,
        mime: string,
        meta: string | null,
        thumb: string | null,
        owner: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    owner: string | null,
    export:  {
      __typename: "Export",
      id: string,
      album:  {
        __typename: "Album",
        id: string,
        name: string | null,
        createdAt: string,
        identityId: string | null,
        owner: string | null,
      } | null,
      owner: string | null,
    } | null,
  } | null,
};

export type OnUpdateAlbumSubscriptionVariables = {
  owner: string,
};

export type OnUpdateAlbumSubscription = {
  onUpdateAlbum:  {
    __typename: "Album",
    id: string,
    name: string | null,
    createdAt: string,
    identityId: string | null,
    files:  {
      __typename: "ModelFileConnection",
      items:  Array< {
        __typename: "File",
        id: string,
        hash: string | null,
        key: string,
        mime: string,
        meta: string | null,
        thumb: string | null,
        owner: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    owner: string | null,
    export:  {
      __typename: "Export",
      id: string,
      album:  {
        __typename: "Album",
        id: string,
        name: string | null,
        createdAt: string,
        identityId: string | null,
        owner: string | null,
      } | null,
      owner: string | null,
    } | null,
  } | null,
};

export type OnDeleteAlbumSubscriptionVariables = {
  owner: string,
};

export type OnDeleteAlbumSubscription = {
  onDeleteAlbum:  {
    __typename: "Album",
    id: string,
    name: string | null,
    createdAt: string,
    identityId: string | null,
    files:  {
      __typename: "ModelFileConnection",
      items:  Array< {
        __typename: "File",
        id: string,
        hash: string | null,
        key: string,
        mime: string,
        meta: string | null,
        thumb: string | null,
        owner: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    owner: string | null,
    export:  {
      __typename: "Export",
      id: string,
      album:  {
        __typename: "Album",
        id: string,
        name: string | null,
        createdAt: string,
        identityId: string | null,
        owner: string | null,
      } | null,
      owner: string | null,
    } | null,
  } | null,
};

export type OnCreateExportSubscriptionVariables = {
  owner: string,
};

export type OnCreateExportSubscription = {
  onCreateExport:  {
    __typename: "Export",
    id: string,
    album:  {
      __typename: "Album",
      id: string,
      name: string | null,
      createdAt: string,
      identityId: string | null,
      files:  {
        __typename: "ModelFileConnection",
        nextToken: string | null,
      } | null,
      owner: string | null,
      export:  {
        __typename: "Export",
        id: string,
        owner: string | null,
      } | null,
    } | null,
    owner: string | null,
  } | null,
};

export type OnUpdateExportSubscriptionVariables = {
  owner: string,
};

export type OnUpdateExportSubscription = {
  onUpdateExport:  {
    __typename: "Export",
    id: string,
    album:  {
      __typename: "Album",
      id: string,
      name: string | null,
      createdAt: string,
      identityId: string | null,
      files:  {
        __typename: "ModelFileConnection",
        nextToken: string | null,
      } | null,
      owner: string | null,
      export:  {
        __typename: "Export",
        id: string,
        owner: string | null,
      } | null,
    } | null,
    owner: string | null,
  } | null,
};

export type OnDeleteExportSubscriptionVariables = {
  owner: string,
};

export type OnDeleteExportSubscription = {
  onDeleteExport:  {
    __typename: "Export",
    id: string,
    album:  {
      __typename: "Album",
      id: string,
      name: string | null,
      createdAt: string,
      identityId: string | null,
      files:  {
        __typename: "ModelFileConnection",
        nextToken: string | null,
      } | null,
      owner: string | null,
      export:  {
        __typename: "Export",
        id: string,
        owner: string | null,
      } | null,
    } | null,
    owner: string | null,
  } | null,
};

export type OnCreateReviewSubscriptionVariables = {
  owner: string,
};

export type OnCreateReviewSubscription = {
  onCreateReview:  {
    __typename: "Review",
    id: string,
    identityId: string | null,
    resume: ReviewResume | null,
    file:  {
      __typename: "File",
      id: string,
      hash: string | null,
      key: string,
      mime: string,
      meta: string | null,
      thumb: string | null,
      owner: string | null,
      album:  {
        __typename: "Album",
        id: string,
        name: string | null,
        createdAt: string,
        identityId: string | null,
        owner: string | null,
      } | null,
      reviews:  {
        __typename: "ModelReviewConnection",
        nextToken: string | null,
      } | null,
    } | null,
    owner: string | null,
  } | null,
};

export type OnUpdateReviewSubscriptionVariables = {
  owner: string,
};

export type OnUpdateReviewSubscription = {
  onUpdateReview:  {
    __typename: "Review",
    id: string,
    identityId: string | null,
    resume: ReviewResume | null,
    file:  {
      __typename: "File",
      id: string,
      hash: string | null,
      key: string,
      mime: string,
      meta: string | null,
      thumb: string | null,
      owner: string | null,
      album:  {
        __typename: "Album",
        id: string,
        name: string | null,
        createdAt: string,
        identityId: string | null,
        owner: string | null,
      } | null,
      reviews:  {
        __typename: "ModelReviewConnection",
        nextToken: string | null,
      } | null,
    } | null,
    owner: string | null,
  } | null,
};

export type OnDeleteReviewSubscriptionVariables = {
  owner: string,
};

export type OnDeleteReviewSubscription = {
  onDeleteReview:  {
    __typename: "Review",
    id: string,
    identityId: string | null,
    resume: ReviewResume | null,
    file:  {
      __typename: "File",
      id: string,
      hash: string | null,
      key: string,
      mime: string,
      meta: string | null,
      thumb: string | null,
      owner: string | null,
      album:  {
        __typename: "Album",
        id: string,
        name: string | null,
        createdAt: string,
        identityId: string | null,
        owner: string | null,
      } | null,
      reviews:  {
        __typename: "ModelReviewConnection",
        nextToken: string | null,
      } | null,
    } | null,
    owner: string | null,
  } | null,
};
