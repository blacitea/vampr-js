class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numberAway = 0;
    let currentV = this;
    while (currentV.creator) {
      numberAway++;
      currentV = currentV.creator;
    }
    return numberAway;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    let myRank = this.numberOfVampiresFromOriginal;
    let yourRank = vampire.numberOfVampiresFromOriginal;
    return myRank < yourRank;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    let me = this;
    let you = vampire;

    if (me.numberOfVampiresFromOriginal === 0) return me;
    if (you.numberOfVampiresFromOriginal === 0) return you;
    if (me.name === you.name) return me;

    const isSibling = (v1, v2) => {
      return v1.creator.name === v2.creator.name;
    };

    while (!isSibling(me, you)) {
      if (me.creator.name === you.name) return you;
      if (you.creator.name === me.name) return me;
      (me.isMoreSeniorThan(you)) ? you = you.creator : me = me.creator;
    }
    if (isSibling(me, you)) return me.creator;
    
  }
}

module.exports = Vampire;

