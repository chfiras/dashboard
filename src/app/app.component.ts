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
  dataByPillar: any;
  dataConfigByPillar: any;
  chartData: any
  cardTitle: string
  constructor(private messageService: MessageService, private teamservice: TeamService, private pillarService: PillarService, private pillarConfigService: PillarConfigService) { }


  ngOnInit() {

    this.teamservice.getTeam().then((res: TreeNode[]) => {
      this.data = res
    })
  }

  onNodeSelect(event: any) {
    this.messageService.add({ severity: 'success', summary: 'Selected Pillar', detail: event.node.label });
    if (event?.node?.value) {
      this.cardTitle = event.node.label
      this.pillarService.getPillarData(event.node.value).then((res: TreeNode[]) => {
        this.dataByPillar = res
      })
      this.pillarConfigService.getPillarConfigData(event.node.value).then((res: TreeNode[]) => {

        this.dataConfigByPillar = res
      })
    }

    if (event?.node?.label === "Software Craftmanship Mindset") {
      this.isVisible = true;
    } else {
      this.isVisible = false;

    }
  };


}
