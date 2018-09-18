import { NgForm } from '@angular/forms/src/directives/ng_form';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Expense } from '../pojos/expense';
import { Budget } from '../pojos/budget';
import { BudgetPageService } from '../services/budget-page.service';
import { BudgetCategory } from '../pojos/budget-category';
import { PartyDetailsService } from '../services/party-details.service';

@Component({
  selector: 'app-budget-page',
  templateUrl: './budget-page.component.html',
  styleUrls: ['./budget-page.component.css'],
  providers: [BudgetPageService]
})

export class BudgetPageComponent implements OnInit {
  private expensesValidationList:Array<string>;
  private expensesList: Array<Expense> = [];
  private expense: Expense = new Expense("", 0, 0);
  private newBudget = new Budget();
  private storedBudget = new Budget();
  private foodItemsList = [];
  private category = new BudgetCategory(0, "", 0);
  private ctgyList: Array<BudgetCategory>;
  private result: number;
  private hiddenForm = true;
  private itemFieldIsEmpty = false;
  private quantityFieldIsEmpty = false;
  private amountFieldIsEmpty = false;
  private isLessthanZero = false;
  private isPageSaved: Boolean;


  @Output()
  changeTab: EventEmitter<boolean> = new EventEmitter();

  constructor(private service: BudgetPageService, private mainService: PartyDetailsService) { }

  @Output()
  onSaveCategory: EventEmitter<BudgetCategory> = new EventEmitter();

  ngOnInit() {

    this.isPageSaved = this.mainService.isBudgetPageSaved;
    if (this.expensesList == undefined) {
      this.expensesList = [];
    }

    //To persist/edit data on Budget Page
    this.storedBudget = this.service.getStoredEventBudget();
    if (this.storedBudget != undefined) {
      this.expensesList = this.storedBudget.expenseList;
      this.newBudget.totalExpense = this.storedBudget.totalExpense;
      this.newBudget.totalQuantity = this.storedBudget.totalQuantity;
      this.category = this.mainService.getBudgetCategory();
    }

    //To fetch the Category Available in database
    this.service.getAllBudgetCategories()
      .subscribe(
        (data: Array<BudgetCategory>) => this.ctgyList = data,
        error => console.log("Error :: " + error));

    //To fetch the foodItems from Food Page
    this.foodItemsList = this.service.getFoodItemsList();

    //List is used for unique value in expenseList, used in appUniqueValidator.
    if (this.expensesValidationList == undefined) {
      this.expensesValidationList = []; 
    }
  }

  //To add Expenses
  addNewExpense() {
    if (this.expense.food !== '' && this.expense.amount !== 0 && this.expense.quantity !== 0) {
      this.expensesList.push(new Expense(this.expense.food, this.expense.amount, this.expense.quantity));
      this.expensesValidationList.push(this.expense.food);// to apply Unique Validation on list
      this.expense.food = '';
      this.expense.amount = 0;
      this.expense.quantity = 0;
    }
    this.itemFieldIsEmpty=true;
  }

  //To remove expenses
  removeExpense(index: number) {
    this.expensesList.splice(index, 1);
    this.expensesValidationList.splice(index,1);
  }

  onEdit() {
    this.mainService.isBudgetPageSaved = false;
    this.isPageSaved = false;
    this.changeTab.emit(false);
  }

  onSelectBudget(value) {
    this.category.budgetCategoryId = value._budgetCategoryId;
    this.category.budgetCategoryName = value._budgetCategoryName;
    this.category.budgetCategoryAmount = value._budgetCategoryAmount;
  }

  onSubmit(budgetForm: NgForm) {
    this.newBudget.totalExpense = this.service.calculateTotalExpense(this.expensesList);
    this.newBudget.totalQuantity = this.service.calculateTotalQuantity(this.expensesList);
    this.category.budgetCategoryAmount = this.category.budgetCategoryAmount - this.newBudget.totalExpense;
    if (this.category.budgetCategoryAmount < 0) {
      this.isLessthanZero = true;
    }
    else {
      this.newBudget.budgetCategoryId = this.category.budgetCategoryId;
      this.newBudget.expenseList = this.expensesList;
      this.service.saveBudget(this.newBudget);
      this.mainService.isBudgetPageSaved = true;
      this.mainService.setBudgetCategory(this.category);
      this.isPageSaved = true;
      this.changeTab.emit(true);// Submit enabled
    }
  }

}
