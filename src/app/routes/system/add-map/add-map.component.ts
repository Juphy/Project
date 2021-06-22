import { Component, OnInit, Input } from "@angular/core";
import Cropper from "cropperjs";
import { HttpClient } from "@angular/common/http";
import { NzModalRef, NzMessageService } from "ng-zorro-antd";
import { environment } from "@env/environment";
@Component({
  selector: "app-add-map",
  templateUrl: "./add-map.component.html",
  styleUrls: ["./add-map.component.scss"]
})
export class AddMapComponent implements OnInit {
  imgSrc;
  cropper: any;

  aspectRatio = 4 / 3; // 纵横比
  width;
  height;
  degree = 0;

  loading = false;
  linkHeader = "http://";
  a = NaN;
  @Input() title: any;
  @Input() image_name: any;
  @Input() link: any = "";
  @Input() id: any;
  constructor(
    private nzModalRef: NzModalRef,
    private http: HttpClient,
    private messageService: NzMessageService
  ) { }

  ngOnInit() { }

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
            aspectRatio: 4 / 3,
            viewMode: 1,
            zoomOnWheel: true,
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
    result.toBlob(blob => {
      let formData = new FormData();
      formData.append("img_path", blob, 'ab.png');
      this.http.post("ucs/upload_img", formData).subscribe(
        res => {
          this.loading = false;

          if (res["status"] === 200) {
            this.image_name = res["result"];
            this.link = environment.api + '/__images/' + this.image_name;
            this.messageService.success("图片上传成功！");
          }
        },
        err => {
          this.loading = false;
        }
      );
    })
  }

  cancel() {
    this.nzModalRef.destroy(false);
  }

  submit() {
    if (!this.title) {
      this.messageService.warning("图片标题不能为空！");
      return;
    }
    if (!this.image_name) {
      this.messageService.warning("尚未上传图片！");
      return;
    }
    let params = {
      title: this.title,
      image_name: this.image_name,
      link: this.link
    };
    if (this.id) {
      params["id"] = this.id;
    }
    this.http.post("api/manager/edit_carousel_map", params).subscribe(res => {
      if (res["status"] === 200) {
        this.messageService.success("添加成功！");
        this.nzModalRef.destroy(true);
      }
    });
  }
}
