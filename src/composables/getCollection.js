import { ref, watchEffect } from "vue";
import { projectFirestore } from "@/firebase/config";

const getCollection = (collection) => {
  const error = ref(null)
  const documents = ref()

  let collectionRef = projectFirestore.collection(collection)
    .orderBy('createdAt')

  const unsub = collectionRef.onSnapshot(snaps => {
    let results = []

    snaps.forEach(snap => {
      snap.data().createdAt && results.push({ ...snap.data(), id: snap.id })
    })
    documents.value = results
    error.value = null

  }, (err) => {
    console.log(err.message)
    documents.value = null
    error.value = 'Could not fetch data'
  })

  watchEffect((onInvalidate) => {
    // unsub from prev collection when watcher is stopped (component unmounted)
    onInvalidate(() => unsub())
  })

  return { documents, error }
}

export default getCollection