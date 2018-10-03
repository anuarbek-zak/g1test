import { Component, OnInit } from '@angular/core';
import {  HttpClient } from '@angular/common/http';
import Chart from 'chart.js';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	title = 'app';
	years:any = [];
	yearFrom = 0;
	yearTo = 0;
	mainData = {}
	constructor(private http: HttpClient) {
	}

	ngOnInit(){
		this.getData('precipitation')
		this.getData('temperature')
	}

	getData(fileName){
		this.http.get(`../assets/${fileName}.json`).subscribe(resp=>{
			this.mainData[fileName] = resp;
			this.createYearsList(resp);
			if(fileName=='temperature') this.drawGraph(fileName,this.yearFrom,this.yearTo)
		});
	}

	createYearsList(resp){
		this.yearFrom = (new Date(resp[0].t)).getFullYear();
		this.yearTo = (new Date(resp[(<any>resp).length-1].t)).getFullYear();
		for(var i=this.yearFrom;i<=this.yearTo;i+=1){
			this.years.push(i);
		}
	}

	drawGraph(fileName,yearFrom,yearTo){
		if(yearTo<=yearFrom) return;
		var yearsAvg = {};
		var prevYear = (new Date(this.mainData[fileName][0].t)).getFullYear(),
		total = 0,
		count = 0;
		for(var i=0;i<this.mainData[fileName].length;i++){
			var currentYear = (new Date(this.mainData[fileName][i].t)).getFullYear();
			if(prevYear==currentYear){
				if(yearFrom<=currentYear && currentYear<=yearTo){
					total+=this.mainData[fileName][i].v;
					count++;
					yearsAvg[prevYear] = total/count;
				}
			}else{
				prevYear = currentYear;
				total = 0;
				count = 0;
			}
		}

		var ctx = (<HTMLCanvasElement>document.getElementById('myChart')).getContext('2d');
		var myLineChart = new Chart(ctx, {
			type: 'line',
			data:{
				datasets:[{
					label:"",
					backgroundColor:'green',
					data:Object.values(yearsAvg)
				}],
				labels: Object.keys(yearsAvg)
			}

		});
	}


}
