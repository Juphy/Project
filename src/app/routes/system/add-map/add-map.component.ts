import { Component, OnInit } from "@angular/core";
import Cropper from "cropperjs";
@Component({
  selector: "app-add-map",
  templateUrl: "./add-map.component.html",
  styleUrls: ["./add-map.component.scss"]
})
export class AddMapComponent implements OnInit {
  imgSrc;
  cropper: any;
  constructor() {}

  ngOnInit() {}

  get_change(e) {
    var files = e.target.files;
    if (files && files.length > 0) {
      let file = files[0];
      let reader = new FileReader();
      reader.onload = e => {
        this.imgSrc = reader.result;
        setTimeout(() => {
          const image: any = document.getElementById("image");
          image["src"] = reader.result;
          if (this.cropper) this.cropper.destroy();
          this.cropper = new Cropper(image, {
            aspectRatio: 16 / 9,
            viewMode: 0,
            zoomOnWheel: false
          });
        }, 0);
      };
      reader.readAsDataURL(file);
    }
  }
}
