import { Component, Input, OnInit } from '@angular/core';
import { ModalController,ToastController } from '@ionic/angular';
import { FirestoreService, urunBilgi } from '../firestore.service';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  @Input() id: string;
  urun:urunBilgi = null;

  constructor(private toastController:ToastController, private modalController:ModalController, private firestoreService:FirestoreService) { }

  ngOnInit() {
    console.log(this.id);
this.firestoreService.urunGetir(this.id).subscribe(sonuc=>{
  this.urun = sonuc;
}, hata=>{});
  }

  kapat()
  {
    //this.modalController.dismiss();
    this.modalController.dismiss({'dismissed':true});
  }

async  urunGuncelle()
  {
await this.firestoreService.urunGuncelle(this.urun);
const toast = await this.toastController.create({
  message:'Ürün Güncellendi!',
  duration:3000
});
toast.present();
this.modalController.dismiss();

  }

  async urunSil()
  {
  await this.firestoreService.urunSil(this.urun);
  const toast = await this.toastController.create({
    message:'Ürün Silindi!',
    duration:2000
  });
  toast.present();
  this.modalController.dismiss();
  }

}
