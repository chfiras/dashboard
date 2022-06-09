import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { TeamService } from './services/team.service';
import { Chart } from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';
import { PillarService } from './services/pillar.service';
import { PillarConfigService } from './services/pillar.config.service';

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
  selectedPillar: string = "P0";
  dataByPillar: any;
  dataConfigByPillar: any;
  chartData: any
  cardTitle: string

  public canvasWidth = 200
  public options = {
    hasNeedle: true,
    needleColor: 'gray',
    needleUpdateSpeed: 1000,
    arcColors: ["rgb(255,84,84)", "rgb(239,214,19)", "rgb(61,204,91)"],
    arcDelimiters: [33, 66],
    rangeLabel: ['0', '100'],
    needleStartValue: 10,
    
  }
  constructor(private messageService: MessageService, private teamservice: TeamService, private pillarService: PillarService, private pillarConfigService: PillarConfigService) {

   }


  ngOnInit() {
    this.teamservice.getTeam().then((res: TreeNode[]) => {
      this.data = res
    })
   
  }

  onNodeSelect(event: any) {
    this.messageService.add({ severity: 'custom', summary: 'Selected Pillar', detail: event.node.label });
    console.log(this.selectedPillar)

    if (event?.node?.value && event?.node?.value!='P0') {
      this.cardTitle = event.node.label
      this.selectedPillar = event.node.value
      this.pillarService.getPillarData(event.node.value).then((res: TreeNode[]) => {
        this.dataByPillar = res
      })
      this.pillarConfigService.getPillarConfigData(event.node.value).then((result: TreeNode[]) => {
        this.dataConfigByPillar = result
      })
    }else{
      this.selectedPillar ='P0'
    }

  };
}
