import Muuri from 'muuri';

const startPredicateInactive = 0;
const startPredicatePending = 1;
const startPredicateResolved = 2;
const startPredicateRejected = 3;

Muuri.Item.prototype.setTag = function(val) {
  this._tag = val;
};

Muuri.Item.prototype.getTag = function() {
  return this._tag;
};

Muuri.Item.prototype._draggable = true;

Muuri.Item.prototype.setDraggable = function(val) {
  this._draggable = val;
};

Muuri.Item.prototype.getDraggable = function() {
  return this._draggable;
};

Muuri.ItemDrag.prototype._preStartCheck = function(event) {
  // Let's activate drag start predicate state.
  if (this._startPredicateState === startPredicateInactive) {
    this._startPredicateState = startPredicatePending;
  }
  // If predicate is pending try to resolve it.
  if (this._startPredicateState === startPredicatePending) {
    this._startPredicateResult = this._startPredicate(this._item, event);
    if (this._startPredicateResult === true && this._item.getDraggable()) {
      this._startPredicateState = startPredicateResolved;
      this._onStart(event);
    } else if (this._startPredicateResult === false) {
      this._startPredicateState = startPredicateRejected;
    }
  }

  // Otherwise if predicate is resolved and drag is active, move the item.
  else if (this._startPredicateState === startPredicateResolved && this._isActive) {
    this._onMove(event);
  }
};

// Muuri.prototype.disableDrag = function() {
//   this._setting
// };