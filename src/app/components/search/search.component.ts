import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-search',
  standalone: true,
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { 
    const navigation = this.router.getCurrentNavigation();
    console.log("navigation",navigation);
  }


  ngOnInit(): void {
    // Accessing the state data
    const navigation = this.router.getCurrentNavigation();
    console.log("navigation",navigation);

    if (navigation?.extras.state) {
      const state = navigation.extras.state as { searchText: string };
      console.log("State:", state.searchText);
    }
  }

}
