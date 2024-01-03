import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { ApiHelperService } from '.././api/api-helper.service';
import { LoadingService } from '.././loading/loading.service';
import { AlertService } from '.././alert/alert.service';
@Injectable({
  providedIn: 'root'
})


export class PhotoService {

  constructor(private alertService: AlertService,private apiHelper: ApiHelperService, private loadingService: LoadingService) { }

  public photos: UserPhoto[] = [];
  public image: any[] = [];


  public async addNewToGallery() {
    // Take a photo
    
    const capturedPhoto:any = await Camera.getPhoto({
      saveToGallery:true,
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
      allowEditing: true,
      quality: 100,
      height:500,
      width:500
    });
    
    this.photos.unshift({
      filepath: "soon...",
      webviewPath: capturedPhoto.base64String
    });
    
    let base64String = `data:image/jpeg;base64,${capturedPhoto.base64String}`;
    const uploadImage = {webviewPath: base64String, base64:'', imageId: '', uploaded: false};
    
    console.log(uploadImage);
    try{
      this.loadingService.present();
      const data = {image: base64String}
      let response:any = await this.apiHelper.saveImage(data);
      this.loadingService.dismiss();
      if(response.status){
        uploadImage.imageId = response.data.id;
        uploadImage.uploaded = true
      }else{
        this.alertService.presentErrorAlert('Failed to select image. Please try again.')
      }
    }catch(ex){
      uploadImage.uploaded = false
      this.loadingService.dismiss();
    }
    // this.image.unshift(  `data:image/jpeg;base64,${capturedPhoto.webPath}` );
    // console.log(this.image);
    // photo.webviewPath = `data:image/jpeg;base64,${readFile.data}`;
    

    return uploadImage;
    

    // this.image.unshift(  `data:image/jpeg;base64,${capturedPhoto.webPath}` );
    // console.log(this.image);
    // photo.webviewPath = `data:image/jpeg;base64,${readFile.data}`;
  }
  
}

export interface UserPhoto {
  filepath: string;
  webviewPath: string;
}