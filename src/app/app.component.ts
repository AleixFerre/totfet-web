import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import PullToRefresh from 'pulltorefreshjs';
import { ItemsListService } from './home/items-list/items-list.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [RouterOutlet],
})
export class AppComponent implements OnInit {
  constructor(private itemsService: ItemsListService) {}

  ngOnInit(): void {
    const itemsService = this.itemsService;
    const styles = this.getStyles();
    PullToRefresh.init({
      mainElement: '#pull-to-refresh',
      refreshTimeout: 100,
      shouldPullToRefresh() {
        // If is mobile, can refresh else not
        return navigator.userAgent.match(/Android|iPhone|iPad|iPod/i)
          ? true
          : false;
      },
      getStyles() {
        return styles;
      },
      onRefresh() {
        itemsService.refreshItems();
      },
    });
  }

  ngOnDestroy(): void {
    PullToRefresh.destroyAll();
  }

  private getStyles() {
    return `
    .__PREFIX__ptr {
      box-shadow: inset 0 -3px 5px rgba(0, 0, 0, 0.12);
      pointer-events: none;
      font-size: 0.85em;
      font-weight: bold;
      top: 0;
      height: 0;
      transition: height 0.3s, min-height 0.3s;
      text-align: center;
      width: 100%;
      overflow: hidden;
      display: flex;
      align-items: flex-end;
      align-content: stretch;
    }

    .__PREFIX__box {
      padding: 10px;
      flex-basis: 100%;
    }

    .__PREFIX__pull {
      transition: none;
    }

    .__PREFIX__text {
      display: none;
    }

    .__PREFIX__icon {
      transition: transform .3s;
    }

    /*
    When at the top of the page, disable vertical overscroll so passive touch
    listeners can take over.
    */
    .__PREFIX__top {
      touch-action: pan-x pan-down pinch-zoom;
    }

    .__PREFIX__release .__PREFIX__icon {
      transform: rotate(180deg);
    }
    `;
  }
}
