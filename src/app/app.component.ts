import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { TeamService } from './services/team.service';
import { Chart } from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';

Chart.register(annotationPlugin);
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [MessageService],
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  data: TreeNode[];

  isVisible: boolean = false;
  selectedNode: TreeNode;
  lineStylesData: any;
  options: any;
  chartData : any
  constructor(private messageService: MessageService, private teamservice: TeamService) {}
   

  ngOnInit() {

    this.teamservice.getTeam().then((res: TreeNode[]) => {
      this.data = res
      console.log(res)
    })

    this.lineStylesData = {
      labels: ['01/04/2022', '16/04/2022', '02/05/2022', '17/05/2022', '01/06/2022', '22/09/2022', '22/10/2022', '22/12/2022', '22/12/2022' , '31/12/2022'],
      datasets: [
          {
              label: 'Technical debt',
              data: [34, 30, 26, 14, 5, 3, 0],
              fill: true,
              borderDash: [5, 5],
              tension: .4,
              borderColor: '#66BB6A'
          }
      ]
  };
  this.options  = {
    title: {
      display: true,
      text: 'My Title',
      fontSize: 16
  },
  legend: {
      position: 'bottom'
  },
    plugins: {
      autocolors: false,
      annotation: {
        annotations: {
          point1: {
            type: 'point',
            radius: 5,
            backgroundColor: 'transparent',
            borderColor: 'red',
            borderWidth: 5,
            pointStyle: 'circle',
            xValue: 8,
            yValue: 0,
          },
          point2 :         {
            type: 'label',
            borderRadius: 6,
            borderWidth: 1,
            content: ['Target', 'value'],
            position: {
              x: 'center',
              y: 'end'
            },
            xValue: 8,
            yValue: 3
          },
          annotation1 : {
            type: 'line',
            borderColor: 'green',
            borderDash: [6, 6],
            borderWidth: 3,
            label: {
              enabled: true,
              backgroundColor: 'lightGreen',
              borderRadius: 0,
              color: 'green',
              content: 'Project timeline'
            },
            arrowHeads: {
              end: {
                enabled: true,
                fill: true,
                borderDash: [],
                borderColor: 'green'
              }
            },
            xMax: 8,
            xMin: 0,
            xScaleID: 'x',
            yMax: 110,
            yMin: 110,
            yScaleID: 'y'
          },
        
          annotation3 : {
            type: 'line',
            borderColor: 'green',
            borderDash: [6, 6],
            borderWidth: 1,
            xMax: 8,
            xMin: 8,
            xScaleID: 'x',
            yMax: 0,
            yMin: 110,
            yScaleID: 'y'
          }        
          
        }
      }
    }
  };
  }

  onNodeSelect(event: any) {
    this.messageService.add({ severity: 'success', summary: 'Selected Pillar', detail: event.node.label });
    if (event?.node?.label === "Software Craftmanship Mindset") {
      this.isVisible = true;
    } else {
      this.isVisible = false;

    }
  };


}
