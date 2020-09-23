// import Vue from 'vue'
// import Vuex from 'vuex'

import { getField, updateField } from 'vuex-map-fields'
import { removeFromArrayById } from './../utils/misc'
const statusMap = {
  ready: {
    text: 'Ready',
  },
  confirming: {
    text: 'Please confirm transaction in your Etherem Wallet',
    title: 'Confirmation Required',
  },
  working: {
    text: 'Working...',
    title: 'Please Wait',
  },
  stillWorking: {
    text: 'Still Working...',
    title: 'Please Wait',
  },
  stillWorkingMore: {
    text: 'Waiting... Mint transaction can take some time.',
    title: 'Please Wait',
  },
  checkTransaction: {
    title: 'Please Wait',
    text:
      'Transaction still pending...  In times of network congestion transactions can take a long time - check the status on etherscan. If something seems wrong, ask us about it on the Infinft Discord.',
  },
  done: {
    title: 'Done',
    text: 'Done',
  },
  completed: {
    title: 'Done',
    text: 'Transaction Complete',
  },
  error: {
    title: 'Error',
    text: 'Error: Something went wrong.',
  },
}

export const state = () => ({
  mintedData: undefined,
  temporaryContractId: '',
  mintStatus: 'ready',
  mintStatusMessage: 'Ready to mint tokens!',
  mintTransactionId: '',
  showStatusModal: false,
  showEditContract: true,
  showThumbnailField: false,
  showNewMetaField: false,
  uploadStatus: null,
  uploadStatusTitle: '',
  uploadThumbnailStatus: null,
  uploadThumbnailStatusTitle: '',
  thumbnailUploadStatus: null,
  ipfsStatus: '',
  fileIpfsHash: '',
  thumbnailIpfsStatus: '',
  thumbnailIpfsHash: '',
  thumbnailIpfsHashDefault: 'QmQw1qUqKnZSLUZEbtQqyWtqv7KeMzdZZ4ixJfEksdcaL9',
  arweaveStatus: '',
  fileArweaveHash: '',
  thumbnailArweaveStatus: '',
  thumbnailArweaveHash: '',
  thumbnailSource:
    'https://gateway.pinata.cloud/ipfs/QmQw1qUqKnZSLUZEbtQqyWtqv7KeMzdZZ4ixJfEksdcaL9',

  // fileHash: '',
  fileName: '',
  fileType: '',
  authorName: '',
  title: '',
  description: '',
  editions: 1,
  series: '',
  royaltyFee: 0,

  metaFieldsJson:
    '[{"id":"rarity", "name":"Rarity",   "value": "epic",   "type":"string",      "helpText":"Enter the rarity this artwork has.",      "required":true   }, {"id":"example", "name":"example",   "value": "common",   "type":"string",      "helpText":"this is a test.",      "required":false   }]',
})

// metaFieldsObj: {
//   id: 'exampleId',
//   name: 'An Example Id',
//   type: 'string',
//   value: 'example Value',
//   helpText: 'example help Text',
//   required: false,
// },
export const getters = {
  mintedData: (state) => state.mintedData,
  mintStatus: (state) => state.mintStatus,
  mintStatusMessage: (state) => state.mintStatusMessage,
  mintStatusTitle: (state) => {
    console.log('mintstatus...', state.mintStatus)
    const mintStatus = state.mintStatus
    const title = statusMap[mintStatus].title
    return title
  },
  mintTransactionId: (state) => state.mintTransactionId,
  uploadStatus: (state) => state.uploadStatus,
  uploadStatusTitle: (state) => state.uploadStatusTitle,
  ipfsStatus: (state) => state.ipfsStatus,
  arweaveStatus: (state) => state.arweaveStatus,
  thumbnailIpfsStatus: (state) => state.thumbnailIpfsStatus,
  thumbnailArweaveStatus: (state) => state.thumbnailArweaveStatus,
  fileIpfsHash: (state) => state.fileIpfsHash,
  fileArweaveHash: (state) => state.fileArweaveHash,
  thumbnailIpfsHash: (state) => state.thumbnailIpfsHash,
  thumbnailIpfsHashDefault: (state) => state.thumbnailIpfsHashDefault,
  thumbnailArweaveHash: (state) => state.thumbnailArweaveHash,
  thumbnailUploadStatus: (state) => state.thumbnailUploadStatus,
  // uploadThumbnailStatus: (state) => state.uploadThumbnailStatus,
  uploadThumbnailStatusTitle: (state) => state.uploadThumbnailStatusTitle,
  thumbnailSource: (state) => state.thumbnailSource,
  metaFieldsObj: (state) => {
    return JSON.parse(state.metaFieldsJson)
  },
  getActiveContractId(state, getters, rootState) {
    const activeContractId = rootState.ui.activeContractId
    return activeContractId
  },
  canMint: (state, getters, rootState) => {
    let canWeMintShit = false
    // console.log('rootState', rootState)
    const activeContractId = rootState.ui.activeContractId
    if (
      activeContractId &&
      state.fileIpfsHash &&
      state.fileArweaveHash &&
      state.fileType &&
      state.authorName &&
      state.title &&
      state.description &&
      state.editions
    ) {
      canWeMintShit = true
    }
    return canWeMintShit
  },
  previewData: (state) => {
    const {
      showThumbnailField,
      uploadStatus,
      activeContractId,
      fileName,
      fileType,
      authorName,
      title,
      description,
      editions,
      series,
      royaltyFee,
      thumbnailIpfsHashDefault,
    } = state

    return {
      showThumbnailField,
      uploadStatus,
      activeContractId,
      fileName,
      fileType,
      authorName,
      title,
      description,
      editions,
      series,
      royaltyFee,
      thumbnailIpfsHashDefault,
    }
  },
  getField,
}

export const mutations = {
  updateField,
  setShowStatusModal(state, value) {
    console.log('settingsstatusmodal show', value)
    state.showStatusModal = value
  },
  setActiveContractId(state, contractAddress) {
    const newContractAddress = state.temporaryContractId
    if (contractAddress) {
      state.activeContractId = contractAddress
      state.showEditContract = false
    }
  },
  clearActiveContractId(state, value) {
    state.activeContractId = null
    state.showEditContract = true
  },
  setShowEditContract(state, newState) {
    console.log('setShowEditContract', newState)
    state.showEditContract = newState
  },
  setShowThumbnailField(state, newState) {
    console.log('setShowThumbnailField newstate', newState)
    state.showThumbnailField = newState
  },
  setShowNewMetaField(state, newState) {
    state.showNewMetaField = newState
  },
  setIpfsStatus(state, data) {
    console.log('setting ipfs status ', data)
    const { mode = 'file', status } = data
    if (mode === 'thumbnail') {
      state.thumbnailIpfsStatus = status
    } else {
      state.ipfsStatus = status
    }
    actions.checkUploadStatus(state, mode)
  },
  setArweaveStatus(state, data) {
    const { mode = 'file', status } = data
    if (mode === 'thumbnail') {
      state.thumbnailArweaveStatus = status
    } else {
      state.arweaveStatus = status
    }
    actions.checkUploadStatus(state, mode)
  },
  setIpfsHash(state, data) {
    console.log('setIpfsHash', data)
    const { mode = 'file', hash } = data
    if (mode === 'thumbnail') {
      state.thumbnailIpfsHash = hash
    } else {
      state.fileIpfsHash = hash
    }
  },
  setArweaveHash(state, data) {
    console.log('setArweaveHash', data)
    const { mode = 'file', hash } = data
    if (mode === 'thumbnail') {
      state.thumbnailArweaveHash = hash
    } else {
      state.fileArweaveHash = hash
    }
  },
  setUploadStatus(state, data) {
    const { mode = 'file', status, text = '' } = data
    //possible status: ready, confirming, active, uploading, error, noFile
    // console.log({ mode, status, text })
    state.uploadStatus = status

    switch (status) {
      case 'ready':
        state.uploadStatusTitle = 'Ready.'
        // setStatusSubtitle(mode, 'Ready.', []);
        // setStatusIconClasses(mode, []);
        //document.getElementById('h').disabled = false;
        break
      case 'confirming':
        state.uploadStatusTitle = 'Awaiting signature confirmation.'
        break

      case 'active':
        // setStatusSubtitle(mode, 'Files Uploading..', []);
        state.uploadStatusTitle = 'Files Uploading...'
        // document.getElementById('h').disabled = false;
        // setStatusIconClasses(mode, ['status-icon', "status-active"]);
        break
      case 'uploading':
        // setStatusSubtitle(mode, 'Uploading, please wait...', []);
        state.uploadStatusTitle = 'Uploading, please wait...'
        // document.getElementById('h').disabled = false;
        // setStatusIconClasses(mode, ['status-icon', "status-working"]);
        // if(mode === "file"){
        //     document.getElementById("uploadStatus").classList.add("ipfsActive")
        //     document.getElementById("uploadStatus").classList.add("arweaveActive")
        //   } else {
        //     document.getElementById("thumbnailStatus").classList.add("ipfsActive")
        //     document.getElementById("thumbnailStatus").classList.add("arweaveActive")
        //   }
        //   document.getElementById('h').disabled = false;

        break
      case 'finished':
        // setStatusSubtitle(mode, 'Finished Uploading.', []);
        state.uploadStatusTitle = 'Finished Uploading.'
        // setStatusIconClasses(mode, ['status-icon', 'status-success']);
        // document.getElementById('h').disabled = false;
        break
      case 'error':
        state.uploadStatusTitle = text
        // setStatusSubtitle(mode, text, ['status-error']);
        // setStatusIconClasses(mode, ['status-icon', "status-error"]);
        // if(mode === "file"){
        //   document.getElementById("uploadStatus").classList.remove("ipfsActive")
        //   document.getElementById("uploadStatus").classList.remove("arweaveActive")
        // } else {
        //   document.getElementById("thumbnailStatus").classList.remove("ipfsActive")
        //   document.getElementById("thumbnailStatus").classList.remove("arweaveActive")
        // }
        // document.getElementById('h').disabled = true;
        break
      case 'noFile':
        // setStatusSubtitle(mode, 'No file selected', []);
        state.uploadStatusTitle = 'No file selected'
        // setStatusIconClasses(mode, ['status-icon', "status-info"]);
        // document.getElementById('h').disabled = true;
        break
      default:
        console.log('setUploadStatus no status')
    }
  },
  setThumbnailSource(state, value) {
    state.thumbnailSource = value
  },
  setThumbnailUploadStatus(state, data) {
    const { mode = 'file', status, text = '' } = data
    state.uploadThumbnailStatus = status

    switch (status) {
      case 'ready':
        state.uploadThumbnailStatusTitle = 'Ready.'
        break
      case 'confirming':
        state.uploadThumbnailStatusTitle = 'Awaiting signature confirmation.'
        break
      case 'active':
        state.uploadThumbnailStatusTitle = 'Files Uploading...'
        break
      case 'uploading':
        state.uploadThumbnailStatusTitle = 'Uploading, please wait...'
        break
      case 'finished':
        state.uploadThumbnailStatusTitle = 'Finished Uploading.'
        break
      case 'error':
        state.uploadThumbnailStatusTitle = text
        break
      case 'noFile':
        state.uploadThumbnailStatusTitle = 'No file selected'
        break
      default:
        console.log('setUploadStatus no status')
    }
  },

  setFileInfo(state, fileInfo) {
    const { fileName, fileType } = fileInfo
    state.fileName = fileName
    state.fileType = fileType
  },
  setMintTransactionId(state, value) {
    state.mintTransactionId = value
  },
  setMintStatus(state, status) {
    const message = statusMap[status].text
    state.mintStatus = status
    state.mintStatusMessage = message
  },
  setMintedData(state, data) {
    console.log('stting minted data: ', data)
    state.mintedData = data
  },
  removeMetaField(state, id) {
    if (!id) {
      return null
    }
    const metaFieldsObj = JSON.parse(state.metaFieldsJson)
    const filteredArray = removeFromArrayById(metaFieldsObj, id)
    const asJson = JSON.stringify(filteredArray)
    state.metaFieldsJson = asJson
  },
  addMetaField(state, metaObj) {
    if (!metaObj) {
      return null
    }
    let newMetaObj = metaObj
    let metaFieldsObj = JSON.parse(state.metaFieldsJson) || []
    if (!newMetaObj.id && newMetaObj.name) {
      const idValue = metaObj.name.replace(/\s/g, '')
      newMetaObj.id = idValue
    }

    metaFieldsObj.push(newMetaObj)
    const asJson = JSON.stringify(metaFieldsObj)
    state.metaFieldsJson = asJson
    state.showNewMetaField = false
  },
  resetMintForm(state, newData) {
    state.metaFieldsJson = '[]'

    state.fileName = ''
    state.fileType = ''
    state.authorName = ''
    state.title = ''
    state.description = ''
    state.editions = ''
    state.series = ''
    state.royaltyFee = 0
    state.mintStatus = 'ready'
    state.mintStatusMessage = 'Ready to mint tokens!'
    state.mintTransactionId = ''

    state.mintedData = undefined

    state.showStatusModal = false

    state.showThumbnailField = false
    state.showNewMetaField = false
    state.uploadStatus = null
    state.uploadStatusTitle = ''
    state.thumbnailUploadStatus = null
    state.ipfsStatus = ''
    state.fileIpfsHash = ''
    state.thumbnailIpfsStatus = ''
    state.thumbnailIpfsHash = ''

    state.arweaveStatus = ''
    state.fileArweaveHash = ''
    state.thumbnailArweaveStatus = ''
    state.thumbnailArweaveHash = ''
  },
}

export const actions = {
  checkUploadStatus(state, mode) {
    let isDone = false
    if (state.ipfsStatus === 'uploaded' && state.arweaveStatus === 'uploaded') {
      isDone = true
      mutations.setUploadStatus(state, { mode: mode, status: 'finished' })
    }
    console.log('isDone', isDone)
    // return isDone
  },
  showStatusModal: (context) => {
    const modalMode = context.rootState.ui.statusModalMode
    const state = context.rootState.mintFormStore
    const { mintStatus } = state
    console.log('modalMode', modalMode)
    console.log('mintStatus', mintStatus)
    const shouldShow =
      mintStatus === 'confirming' ||
      mintStatus === 'working' ||
      mintStatus === 'stillWorking' ||
      mintStatus === 'stillWorkingMore' ||
      mintStatus === 'checkTransaction' ||
      mintStatus === 'error'
        ? true
        : false

    return modalMode === 'fixed' && shouldShow ? true : false
  },
  showCompletedModal: (context) => {
    const modalMode = context.rootState.ui.statusModalMode
    const state = context.rootState.mintFormStore
    const { mintStatus, mintedData } = state

    const shouldShow = mintStatus === 'completed' ? true : false

    console.log('shouldshow: ', shouldShow)
    return modalMode === 'fixed' && shouldShow ? true : false
  },
}