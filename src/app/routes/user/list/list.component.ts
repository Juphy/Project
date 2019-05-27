import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import * as G6 from "@antv/g6";
import * as Hierarchy from "@antv/hierarchy";
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  data = [];
  @Input() user_id;
  @Input() type; //0 父级 1子级
  constructor(private http: HttpClient) { }

  ngOnInit() {
    if (this.type === 0) {
      this.http
        .post("api/manager/user_parent_list", { user_id: this.user_id })
        .subscribe(res => {
          this.data = res['data'];
        });
    }
    if (this.type === 1) {
      this.http
        .post("api/manager/user_child_list", { user_id: this.user_id })
        .subscribe(res => {
          let _data = res['data'];
          let data = {
            id: 'asd',
            children: [
              {
                id: 'qwe'
              }
            ]
          };
          var graph = new G6.TreeGraph({
            container: 'BOX',
            width: window.innerWidth,
            height: window.innerHeight,
            pixelRatio: 2,
            modes: {
              default: [{
                type: 'collapse-expand',
                onChange: function onChange(item, collapsed) {
                  var data = item.get('model').data;
                  data.collapsed = collapsed;
                  return true;
                }
              }, 'drag-canvas', 'zoom-canvas']
            },
            defaultNode: {
              size: 16,
              anchorPoints: [[0, 0.5], [1, 0.5]]
            },
            defaultEdge: {
              shape: 'cubic-horizontal'
            },
            nodeStyle: {
              default: {
                fill: '#40a9ff',
                stroke: '#096dd9'
              }
            },
            edgeStyle: {
              default: {
                stroke: '#A3B1BF'
              }
            },
            layout: function layout(data) {
              return Hierarchy.dendrogram(data, {
                direction: 'LR', // H / V / LR / RL / TB / BT
                nodeSep: 20,
                rankSep: 100
              });
            }
          });
          graph.data(data);
          graph.render();
          graph.getNodes().forEach(function (node) {
            var model = node.get('model');
            model.label = model.data.id;
            model.labelCfg = {
              offset: 10,
              style: {
                fill: '#666'
              }
            };
            if (model.children && model.children.length > 0) {
              model.labelCfg.position = 'left';
            } else {
              model.labelCfg.position = 'right';
            }
          });
          graph.refresh();
          graph.fitView();
        });
    }
  }

}
