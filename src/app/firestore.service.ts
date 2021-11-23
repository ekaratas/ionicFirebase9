import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, addDoc, deleteDoc, updateDoc } from '@angular/fire/firestore';

export interface urunBilgi{
  id?:string;
  ad:string;
  adet:string;
}

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore:Firestore) { }

  kayitListele() :any
  {
    const urunSonuc = collection(this.firestore,'urunler');
    return collectionData(urunSonuc, {idField: 'id'});
  }

  yeniKayit(urun:urunBilgi){
    const urunSonuc = collection(this.firestore,'urunler');
    return addDoc(urunSonuc,urun);
  }

  urunGetir(id):any
  {
    const urunSonuc = doc(this.firestore, `urunler/${id}`);
    return docData(urunSonuc , {idField: 'id'});
  }

  urunSil(urun: urunBilgi) {
    const urunSonuc = doc(this.firestore, `urunler/${urun.id}`);
    return deleteDoc(urunSonuc);
  }

  urunGuncelle(urun: urunBilgi) {
    const urunSonuc = doc(this.firestore, `urunler/${urun.id}`);
    return updateDoc(urunSonuc,{ad:urun.ad, adet:urun.adet});
  }

}
