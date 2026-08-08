import { TitleCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from '@openng/optimus-ui/button';
import { DialogService } from '@openng/optimus-ui/dynamicdialog';
import { RadioButtonModule } from '@openng/optimus-ui/radiobutton';
import { filter } from 'rxjs';
import { LOCAL_STORAGE_KEYS } from '../../../../shared/globals';
import { List, listFromArray } from '../../../../shared/list.model';
import { ItemsListService } from '../../../items-list/items-list.service';
import { MultitenantAddComponent } from './multitenant-add/multitenant-add.component';

@Component({
    selector: 'app-multitenant-menu',
    imports: [
        RadioButtonModule,
        FormsModule,
        ButtonModule,
        TitleCasePipe,
    ],
    providers: [DialogService],
    templateUrl: './multitenant-menu.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './multitenant-menu.component.scss'
})
export class MultitenantMenuComponent implements OnInit {
  /** Asks the host drawer to close. */
  @Output() done = new EventEmitter<void>();

  selectedList!: List;
  lists: List[] = [];

  constructor(
    private itemsService: ItemsListService,
    private dialogService: DialogService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.selectedList = listFromArray(
      localStorage.getItem(LOCAL_STORAGE_KEYS.AUTHORIZATION)!.split(':')
    );
    this.lists = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEYS.LISTS) || '[]'
    );
  }

  selectList(listSelected: List) {
    localStorage.setItem(
      LOCAL_STORAGE_KEYS.AUTHORIZATION,
      `${listSelected.name}:${listSelected.password}`
    );
    this.itemsService.refreshItems();
    this.done.emit();
  }

  openInfo() {
    const ref = this.dialogService.open(MultitenantAddComponent, {
      header: 'Vols afegir una llista?',
      modal: true,
      dismissableMask: true,
    });

    // The dialog used to receive this component's MatBottomSheetRef through
    // MAT_DIALOG_DATA so it could dismiss the sheet itself. It now just reports
    // whether the user chose to log out, and the close bubbles up from here.
    ref?.onClose
      .pipe(filter((logout: boolean) => logout))
      .subscribe(() => {
        this.done.emit();
        this.router.navigate(['/login']);
      });
  }
}
