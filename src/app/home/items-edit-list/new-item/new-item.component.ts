import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ChangeDetectionStrategy,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MessageService } from '@openng/optimus-ui/api';
import { AutoComplete, AutoCompleteModule } from '@openng/optimus-ui/autocomplete';
import { ButtonModule } from '@openng/optimus-ui/button';
import { CheckboxModule } from '@openng/optimus-ui/checkbox';
import { FloatLabelModule } from '@openng/optimus-ui/floatlabel';
import { InputTextModule } from '@openng/optimus-ui/inputtext';
import { MessageModule } from '@openng/optimus-ui/message';
import { ToggleSwitchModule } from '@openng/optimus-ui/toggleswitch';
import { AutoCompleteCompleteEvent } from '@openng/optimus-ui/types/autocomplete';
import { ItemsListService } from '../../items-list/items-list.service';
import { Item } from '../../items-list/items.model';

@Component({
    selector: 'app-new-item',
    imports: [
        FloatLabelModule,
        InputTextModule,
        ReactiveFormsModule,
        FormsModule,
        ButtonModule,
        MessageModule,
        CheckboxModule,
        ToggleSwitchModule,
        AutoCompleteModule,
    ],
    templateUrl: './new-item.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './new-item.component.scss'
})
export class NewItemComponent implements OnInit {
  /** The item being edited; absent when adding a new one. */
  @Input() item?: Item;
  /** Asks the host drawer to close. */
  @Output() done = new EventEmitter<void>();

  /**
   * Validators are declared here rather than relying on the native `required` /
   * `min` / `max` attributes. Material's `matInput` mirrored those attributes
   * into the form control; `pInputText` does not, so without these the error
   * messages and `[disabled]="itemForm.invalid"` would silently stop working.
   */
  itemForm = new FormGroup({
    name: new FormControl<string>('', [
      Validators.required,
      Validators.maxLength(100),
    ]),
    amount: new FormControl<number>(1, [
      Validators.required,
      Validators.min(1),
      Validators.max(100),
    ]),
    closed: new FormControl<boolean>(false),
  });

  @ViewChild(AutoComplete) nameInput!: AutoComplete;

  filteredItems: string[] = [];
  private allItemNames = this.itemService.getAllItemNames();

  addMore = false;

  constructor(
    private messageService: MessageService,
    private itemService: ItemsListService
  ) {}

  ngOnInit(): void {
    this.itemForm.setValue({
      name: this.item?.name ?? '',
      amount: this.item?.amount ?? 1,
      closed: this.item?.closed ?? false,
    });
  }

  /**
   * Optimus pulls suggestions via this callback, replacing the `valueChanges`
   * observable Material's autocomplete pushed through.
   */
  filterItems(event: AutoCompleteCompleteEvent) {
    const query = event.query.toLowerCase();
    this.filteredItems = this.allItemNames.filter((option: string) =>
      option.toLowerCase().includes(query)
    );
  }

  submitForm() {
    if (this.itemForm.invalid) return;
    this.item ? this.updateItem() : this.addItem();
  }

  updateItem() {
    this.itemService
      .editItem({ id: this.item!.id, ...this.itemForm.value } as Partial<Item>)
      .subscribe(() => {
        this.messageService.add({
          severity: 'success',
          detail: 'Compra actualitzada correctament',
          life: 5000,
        });
      });
    this.done.emit();
  }

  addItem() {
    this.itemService
      .addItem(this.itemForm.value as Partial<Item>)
      .subscribe(() => {
        this.messageService.add({
          severity: 'success',
          detail: 'Compra afegida correctament',
          life: 5000,
        });
      });

    if (!this.addMore) {
      this.done.emit();
    } else {
      this.nameInput?.inputEL?.nativeElement.focus();
      this.itemForm.reset();
      this.itemForm.setValue({ name: '', amount: 1, closed: false });
    }
  }
}
