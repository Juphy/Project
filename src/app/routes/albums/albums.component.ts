import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, fromEvent } from 'rxjs';
import { map, filter, scan, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit, AfterViewInit {
  albums = [];
  page = 1;
  pagesize = 50;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.get_albums();
  }

  ngAfterViewInit(): void {
    let Album = document.getElementById('Album');
    console.log(Album);
    let stream$ = fromEvent(Album, 'scroll');
    stream$.pipe(
      debounceTime(250),
    ).subscribe(res => {
      let target = res['srcElement'];
      if ((target['offsetTop'] + 400) > target['offsetHeight']) {
        this.page = this.page + 1;
        this.get_albums();
      }
    })
  }

  get_albums() {
    let params = {
      page: this.page,
      pagesize: this.pagesize
    };
    this.http.post('album/list', params).subscribe(res => {
      if (res['status'] === 200) {
        let result = res['result'];
        this.albums = result['rows'];
      }
    })
  }
}
