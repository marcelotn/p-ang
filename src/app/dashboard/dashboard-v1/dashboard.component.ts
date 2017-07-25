import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PageTitleService } from '../../core/page-title/page-title.service';
import {fadeInAnimation} from "../../core/route-animation/route.animation";

@Component({
  selector: 'ms-dashboard',
  templateUrl:'./dashboard-component.html',
  styleUrls: ['./dashboard-component.scss'],
  encapsulation: ViewEncapsulation.None,
    host: {
        "[@fadeInAnimation]": 'true'
    },
    animations: [ fadeInAnimation ]
})
export class DashboardComponent implements OnInit  {

  rows = [];
  lineChartDemoData;
  newTodo: string;
  todos: any;
  todoObj: any;
  public customStyle = [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}]

  lat: number = 50.937531;
  lng: number = 6.960278600000038;
  constructor( private pageTitleService: PageTitleService) {
    this.fetch((data) => { this.rows = data; });
    this.newTodo = '';
    this.todos = [
      {newTodo:"Add widget to another site",completed:false},
      {newTodo:"Update the server no 2",completed:false},
      {newTodo:"Clean all junks now",completed:false},
      {newTodo:"Admin template optimize",completed:false},
      {newTodo:"Set record on piano tiles 2",completed:false},
      {newTodo:"Buy a fish for home",completed:false},
      {newTodo:"Wash the ear for holiday",completed:true},
      {newTodo:"Complete your task till Monday",completed:false},
      {newTodo:"Send mail to client",completed:false},
      {newTodo:"Analyis the whole project",completed:false}
    ];
  }
  ngOnInit() {
    this.pageTitleService.setTitle("Home");
  }

  // lineChart
  public lineChartData:Array<any> = [
    {data: [90, 150, 80, 300, 90, 290, 350,200,80,100,220,230,310,230,150,180,120,150], label: 'Series A'},
    {data: [110, 90, 150, 130, 290, 210, 200,80,80,110,320,310,50,170,210,310,150,80,450], label: 'Series B'},
  ];
  public lineChartLabels:Array<any> = ['1', '2', '3', '4', '5', '6', '7','8','9','10','11','12','13','14','15','16','17','18'];
  public lineChartOptions:any = {
    responsive: true,
    scales: {
      xAxes: [{
        ticks: {
          beginAtZero: true,
          suggestedMax: 450
        }
      }]
    }
  };
  lineChartColors: Array <any> = [{
    backgroundColor: 'rgba(235, 78, 54, 0.2)',
    borderColor: 'rgba(235, 78, 54, 1)',
    pointBackgroundColor: 'rgba(235, 78, 54, 1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(235, 78, 54, 0.8)'
  }, {
    backgroundColor: 'rgba(50, 203, 216, 0.2)',
    borderColor: 'rgba(50, 203, 216, 1)',
    pointBackgroundColor: 'rgba(50, 203, 216, 1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(50, 203, 216, 0.8)'
  }];
  public lineChartLegend:boolean = false;
  public lineChartType:string = 'line';

	// Team
  team: Object[] = [{
    name: 'Isabela Phelaps',
    photo: 'assets/img/user-1.jpg',
    post: 'Sr.Manager',
  }, {
    name: 'Trevor Hansen',
    photo: 'assets/img/user-2.jpg',
    post: 'Manager',
  }, {
    name: 'Sandra Adams',
    photo: 'assets/img/user-3.jpg',
    post: 'Engineer',
  },{
    name: 'Sandy Smith',
    photo: 'assets/img/user-4.jpg',
    post: 'Engineer',
  },{
    name: 'Rosy Wonn',
    photo: 'assets/img/user-5.jpg',
    post: 'Jr.Engineer',
  },{
    name: 'Alex Roddy',
    photo: 'assets/img/user-6.jpg',
    post: 'Jr.Engineer',
  }];

	// project table
	fetch(cb) {
  	const req = new XMLHttpRequest();
  	req.open('GET', `assets/data/projects.json`);
  	req.onload = () => {
    	cb(JSON.parse(req.response));
  	};
  	req.send();
	}

  // Doughnut
	public doughnutChartLabels:string[] = ['Bounce', 'Open', 'Unsuscribe'];
	public doughnutChartData:number[] = [500, 250, 150];
	public doughnutChartType:string = 'doughnut';
  doughnutChartColors: any[] = [{
    backgroundColor: ['#32CBD8', '#E8C63B', '#f0f2f7']
  }];
	public doughnutChartOptions: any = {
    responsive: true,
    elements: {
      arc: {
        borderWidth: 0
      }
   	},
   	legend: {
      position: 'bottom',
      labels: {
       usePointStyle: true,
      }
    }
  }

  //ToDo List
  addTodo(event) {
    this.todoObj = {
      newTodo: this.newTodo,
      completed: false
    }
    this.todos.push(this.todoObj);
    this.newTodo = '';
    event.preventDefault();
  }

  //Manage List
  list: Object[] = [{
  	title: "5 Text editor that are free",
  	photo: "assets/img/post1.jpg",
  	desc: "Consectetur adipisicing elit. Ullam expedita, necessitatibus sit exercitationem aut quo quos inventore, similique nulla minima distinctio illo iste dignissimos vero nostrum, magni pariatur delectus natus.",
  	author: "Admin",
  	postdate: "3 Days Ago"
  },{
  	title: "Know more about To Do List",
  	photo: "assets/img/post2.jpg",
  	desc: "Repellendus ipsum illum optio sequi at iste. Odit molestiae, voluptatem dignissimos. Necessitatibus dolore tempora error quia minus! Esse, quidem, impedit. Delectus itaque impedit excepturi.",
  	author: "Help Desk",
  	postdate: "1 Days Ago"
  },{
  	title: "Latest Angular Admin Themes",
  	photo: "assets/img/post3.jpg",
  	desc: "Nesciunt, quae, hic debitis, molestias in repellat facere animi sequi deserunt quia cum numquam aut illum et ipsam perspiciatis, quod nobis consequuntur fugit delectus. Hic consequatur Ullam expedita.",
  	author: "Kenny",
  	postdate: "3 Hrous Ago"
  }];

  // Yearly sales
  public barChartLabels:string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = false;

  public barChartData:any[] = [
    {data: [9,6,7,3,4,5,4,7,9,7], label: 'Series A'},
  ];
  
  public barStackChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      xAxes: [{
        stacked: false,
        barThickness: 18,
        display: true,
        gridLines: {
          color: 'rgba(0,0,0,0)',
          zeroLineColor: 'rgba(0,0,0,0)'
        },
        ticks: {
          beginAtZero: true,
          suggestedMax: 10
        }
      }],
      yAxes: [{
        stacked: true,
        barThickness: 18,
        gridLines: {
          color: 'rgba(255, 255, 255, 0.4)',
          zeroLineColor: 'rgba(255, 255, 255, 0.4)'
        }
      }]
    }
  };
  barChartColors: Array <any> = [{
    backgroundColor: '#fff',
    borderColor: 'rgba(50, 203, 216, 1)',
  }];

    // Bubble Chart
    bubbleChartData: Array <any> = [{
      data: [{
      x: 1,
      y: 2,
      r: 18,
    },{
      x: 1,
      y: 8,
      r: 12,
    }, {
      x: 3,
      y: 6,
      r: 12,
    }, {
      x: 5,
      y: 8,
      r: 18,
    }, {
      x: 7,
      y: 4,
      r: 12,
    }, {
      x: 9,
      y: 2,
      r: 15,
    }, {
      x: 9,
      y: 9,
      r: 12,
    }],
      label: 'Series A',
      borderWidth: 1
    }];
    bubbleChartType = 'bubble';
    bubbleChartColors: Array <any> = [{
      backgroundColor: 'rgba(67, 210, 158, 1)',
      borderColor: 'rgba(67, 210, 158, 1)',
      pointBackgroundColor: 'rgba(67, 210, 158, 1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(67, 210, 158, 0.8)'
  }];
    public bubbleChartOptions:any = {
      responsive: true,
      scales: {
        xAxes: [{
          gridLines: {
            color: 'rgba(0,0,0,0)',
            zeroLineColor: 'rgba(0,0,0,0)',
          },
          ticks: {
            beginAtZero: true,
            suggestedMax: 10
          }
        }],
        yAxes: [{
          gridLines: {
            color: 'rgba(0,0,0,0.09)',
            zeroLineColor: 'rgba(0,0,0,0.09)'
          },
          ticks: {
            beginAtZero: true,
            suggestedMax: 10
          }
        }]
      }
    };
}
