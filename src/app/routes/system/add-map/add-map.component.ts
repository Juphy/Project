import { Component, OnInit, Input } from "@angular/core";
import Cropper from "cropperjs";
import { HttpClient } from "@angular/common/http";
import { NzModalRef, NzMessageService } from "ng-zorro-antd";
import { siteinfo } from "@core/store";
@Component({
  selector: "app-add-map",
  templateUrl: "./add-map.component.html",
  styleUrls: ["./add-map.component.scss"]
})
export class AddMapComponent implements OnInit {
  imgSrc;
  cropper: any;

  aspectRatio = 16 / 9; // 纵横比
  width;
  height;
  degree = 0;

  loading = false;
  @Input() title: any = "";
  @Input() image_name: any = "";
  @Input() link: any = "";
  @Input() id: any = "";
  constructor(
    private nzModalRef: NzModalRef,
    private http: HttpClient,
    private messageService: NzMessageService
  ) {}

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
          let that = this;
          this.cropper = new Cropper(image, {
            aspectRatio: 16 / 9,
            viewMode: 1,
            zoomOnWheel: false,
            crop(event) {
              that.height = event.detail.height.toFixed(0);
              that.width = event.detail.width.toFixed(0);
            }
          });
        }, 0);
      };
      reader.readAsDataURL(file);
    }
  }

  change_aspectRatio(value) {
    if (value) {
      this.cropper.setAspectRatio(value);
    } else {
      this.cropper.setAspectRatio(NaN);
    }
  }

  change_rotate(value) {
    if (value) {
      this.degree += value;
      this.cropper.rotateTo(this.degree);
    } else {
      this.degree = 0;
      this.cropper.reset();
    }
  }

  change_move(x, y) {
    this.cropper.move(x, y);
  }

  upload_image() {
    this.loading = true;
    const result = this.cropper.getCroppedCanvas({
      maxWidth: 4096,
      maxHeight: 4096,
      fillColor: "#fff"
    });
    function convertBase64UrlToBlob(urlData) {
      var bytes = window.atob(urlData.split(",")[1]);
      var ab = new ArrayBuffer(bytes.length);
      var ia = new Uint8Array(ab);
      for (var i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i);
      }
      return new Blob([ab], { type: "image/png" });
    }

    let formData = new FormData();
    formData.append(
      "photo",
      convertBase64UrlToBlob(result.toDataURL("image/jpeg"))
    );
    this.http.post("api/upload_file", formData).subscribe(
      res => {
        this.loading = false;
        console.log(res);
        if (res["status"] === 200) {
          this.link = siteinfo.ucs + res["data"];
        }
      },
      err => {
        this.loading = false;
      }
    );
  }

  cancel() {
    this.nzModalRef.destroy(false);
  }

  submit() {
    let params = {
      title: this.title,
      image_name: this.image_name,
      link: this.link
    };
    if (this.id) {
      params["id"] = this.id;
    }
    this.http.post("api/manager/edit_carousel_map", params).subscribe(res => {
      console.log(res);
      if (res["status"] === 200) {
        this.nzModalRef.destroy(true);
      }
    });
  }
}
