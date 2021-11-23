import { Component } from '@angular/core';
import { FirestoreService, urunBilgi} from '../firestore.service';
import { AlertController, ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  urunler:urunBilgi[] = [];

  constructor(private firestoreService:FirestoreService, private alertCtrl: AlertController, private modalCtrl: ModalController) {

this.firestoreService.kayitListele().subscribe(sonuc=> { this.urunler = sonuc; }, hata =>{});

  }

async kayitEkle(){
  const alert = await this.alertCtrl.create({
    header: 'Ürün Ekle',
    inputs: [
      {
        name: 'ad',
        placeholder: 'ürün giriniz',
        type: 'text'
      },
      {
        name: 'adet',
        placeholder: 'adet giriniz',
        type: 'number'
      }
    ],
    buttons: [
      {
        text: 'Vazgeç',
        role: 'cancel'
      }, {
        text: 'Ekle',
        handler: res => {
          this.firestoreService.yeniKayit({ ad: res.ad, adet:res.adet});
          console.log('Kayıt Eklendi');

        }
      }
    ]
  });

  await alert.present();
}

async detayGoster(urun:urunBilgi)
{
const modal = await this.modalCtrl.create({
component:ModalPage,
componentProps: {id:urun.id},
});
await modal.present();
}

}
