import { Component, ContentChild, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DBService } from '../Services/db.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageService } from '../Services/image.service';
import { books } from '../Models/books';
import { NgbCarousel, NgbCarouselModule, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  constructor(private db: DBService, private modalService: NgbModal, private imageService: ImageService){}
  
  books: any = [];
  popbooks: any = [];
  ngOnInit(): void {
    
    // this.db.getBooks().subscribe(
    //   v => {
    //     this.books = v;
    //   }
    // )

    console.log(this.books)
  }

  images = [
    {name: 'Everything is F*cked',image: '/assets/popbooks/mmevery.jpg'},
    {name: 'One Good Deed',image: '/assets/popbooks/oneGoodDeed.jpg'},
    {name: 'The Subtle Art of Not Giving a F*ck',image: '/assets/popbooks/subtleart.jpg'},
    {name: 'In Cold Blood',image: '/assets/popbooks/tcInColdBlood.jpg'},
    {name: 'The Cold Millions',image: '/assets/popbooks/theCold.jpg'}
  ]

  // @ContentChild('longContent') longContent?: ElementRef
  // openScrollableContent(longContent: any) {
	// 	this.modalService.open(longContent, { scrollable: true });
	// }


  
  emitImage(book: books){
    return this.imageService.getBook(book.name);
  }

  paused = false;
	unpauseOnArrow = false;
	pauseOnIndicator = false;
	pauseOnHover = true;
	pauseOnFocus = true;

	@ViewChild('carousel', { static: true }) carousel!: NgbCarousel;

	togglePaused() {
		if (this.paused) {
			this.carousel.cycle();
		} else {
			this.carousel.pause();
		}
		this.paused = !this.paused;
	}

	onSlide(slideEvent: NgbSlideEvent) {
		if (
			this.unpauseOnArrow &&
			slideEvent.paused &&
			(slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)
		) {
			this.togglePaused();
		}
		if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
			this.togglePaused();
		}
	}
  

}
