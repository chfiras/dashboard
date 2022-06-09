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
  selectedPillarName :string =""
  dataByPillar: any;
  dataConfigByPillar: any;
  chartData: any
  cardTitle: string

  public thresholdConfig = {
    '0': { color: 'rgb(176, 9, 27)', bgOpacity: .7 },
    '33': { color: 'yellow', bgOpacity: .7 },
    '66': { color: 'green', bgOpacity: .7 }
  };
  constructor(private messageService: MessageService, private teamservice: TeamService, private pillarService: PillarService, private pillarConfigService: PillarConfigService) {

  }


  ngOnInit() {
    this.teamservice.getTeam().then((res: TreeNode[]) => {
      this.data = res
    })

  }

  onNodeSelect(event: any) {
    this.messageService.add({ severity: 'custom', summary: 'Selected Pillar', detail: event.node.label,  life: 1000 });
    console.log(this.selectedPillar)

    if (event?.node?.value && event?.node?.value != 'P0') {
      this.cardTitle = event.node.label
      this.selectedPillar = event.node.value
      this.selectedPillarName = event.node.label
      this.pillarService.getPillarData(event.node.value).then((res: TreeNode[]) => {
        this.dataByPillar = res
      })
      this.pillarConfigService.getPillarConfigData(event.node.value).then((result: TreeNode[]) => {
        this.dataConfigByPillar = result
      })
    } else {
      this.selectedPillar = 'P0'
      this.data[0].expanded =true
    }

  };
  getMarkerValue(value: number): any {
    var obj: { [k: string]: any } = {};
    obj[value] = { color: "#555", type: "triangle", size: 8, font: "24px arial" };
    return obj;
  }
}
