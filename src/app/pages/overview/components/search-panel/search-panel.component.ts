import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup} from "@angular/forms";
import {MatDatepickerInputEvent} from "@angular/material/datepicker";
import {DateAdapter} from "@angular/material/core";

/**
 * Displays search panel
 */
@Component({
  selector: 'app-search-panel',
  templateUrl: './search-panel.component.html',
  styleUrls: ['./search-panel.component.scss']
})
export class SearchPanelComponent implements OnInit, OnChanges {

  /** Map of categories */
  @Input() categoriesValuesMap: Map<string, [string, boolean, boolean]> = new Map<string, [string, boolean, boolean]>();
  /** Map of languages */
  @Input() languagesValuesMap: Map<string, [string, boolean, boolean]> = new Map<string, [string, boolean, boolean]>();
  /** Start date */
  @Input() startDate: Date | null = null;
  /** End date */
  @Input() endDate: Date | null = null;

  /** Background color for teams tags */
  @Input() categoriesBackgroundColor = 'transparent';
  /** Background color for locations tags */
  @Input() languagesBackgroundColor = 'transparent';

  /** Event emitter indicating filter value being changed */
  @Output() categoriesSelectedEmitter = new EventEmitter<Map<string, [string, boolean, boolean]>>();
  /** Event emitter indicating filter value being changed */
  @Output() languagesSelectedEmitter = new EventEmitter<Map<string, [string, boolean, boolean]>>();
  /** Event emitter indicating filter value being changed */
  @Output() startDateSelectedEmitter = new EventEmitter<Date | null>();
  /** Event emitter indicating filter value being changed */
  @Output() endDateSelectedEmitter = new EventEmitter<Date | null>();
  /** Event emitter indicating past events selected */
  @Output() pastEventsSelectedEmitter = new EventEmitter<boolean>();

  /** Date picker range */
  range = new UntypedFormGroup({
    start: new UntypedFormControl(null),
    end: new UntypedFormControl(null),
  });

  /** Number */
  num = Number;

  /**
   * Constructor
   * @param dateAdapter data adapter
   */
  constructor(private dateAdapter: DateAdapter<any>) {
  }

  //
  // Lifecycle hooks
  //

  /**
   * Handles on-init lifecycle phase
   */
  ngOnInit() {
    this.dateAdapter.setLocale("de");
  }

  /**
   * Handles on-changes lifecycle phase
   */
  ngOnChanges(changes: SimpleChanges) {
    this.initializeRange(this.startDate, this.endDate);
  }

  //
  //  Initialization
  //

  /**
   * Initializes range
   */
  private initializeRange(startDate: Date | null, endDate: Date | null) {
    this.range = new UntypedFormGroup({
      start: new UntypedFormControl(startDate),
      end: new UntypedFormControl(endDate),
    });
  }

  /**
   * Handles selection of categories
   * @param event map of categories
   */
  onCategoriesSelected(event: Map<string, [string, boolean, boolean]>) {
    this.categoriesSelectedEmitter.emit(event);
  }

  /**
   * Handles selection of languages
   * @param event map of languages
   */
  onLanguagesSelected(event: Map<string, [string, boolean, boolean]>) {
    this.languagesSelectedEmitter.emit(event);
  }

  /**
   * Handles selection of start date
   * @param event datepicker event
   */
  onStartDateChanged(event: MatDatepickerInputEvent<Date>) {
    if (event.value != null) {
      this.startDateSelectedEmitter.emit(event.value);
    }
  }

  /**
   * Handles selection of end date
   * @param event datepicker event
   */
  onEndDateChanged(event: MatDatepickerInputEvent<Date>) {
    if (event.value != null) {
      this.endDateSelectedEmitter.emit(event.value);
    }
  }

  /**
   * Handles click on past-events button
   */
  onPastEventsClicked() {
    const today = new Date();

    this.startDateSelectedEmitter.emit(null);
    this.endDateSelectedEmitter.emit(today);

    this.pastEventsSelectedEmitter.emit(true);
  }

  /**
   * Handles click on upcoming-seven-days button
   */
  onUpcomingSevenDaysClicked() {
    const today = new Date();
    const endDate = new Date(today);
    endDate.setDate(endDate.getDate() + 7);

    this.startDateSelectedEmitter.emit(today);
    this.endDateSelectedEmitter.emit(endDate);
  }

  /**
   * Handles click on upcoming-thirty-days button
   */
  onUpcomingThirtyDaysClicked() {
    const today = new Date();
    const endDate = new Date(today);
    endDate.setDate(endDate.getDate() + 31);

    this.startDateSelectedEmitter.emit(today);
    this.endDateSelectedEmitter.emit(endDate);
  }

  /**
   * Handles click on time-range-reset button
   */
  onTimeRangeResetClicked() {
    const today = new Date();
    const endDate = null;

    this.startDateSelectedEmitter.emit(today);
    this.endDateSelectedEmitter.emit(endDate);
  }
}
