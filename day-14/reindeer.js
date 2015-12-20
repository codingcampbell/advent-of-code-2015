'use strict';

class Reindeer {
  constructor(speed, stamina, recovery) {
    this.speed = speed;
    this.stamina = stamina;
    this.recovery = recovery;
    this.resting = false;
    this.timer = 0;
    this.distance = 0;
    this.points = 0;
  }

  update(delta) {
    while (delta > 0) {
      delta -= 1;

      if (!this.resting) {
        this.distance += this.speed;
      }

      this.timer += 1;

      if (this.resting && this.timer === this.recovery) {
        this.resting = false;
        this.timer = 0;
      }

      if (!this.resting && this.timer === this.stamina) {
        this.resting = true;
        this.timer = 0;
      }
    }
  }
}

class ReindeerTimer {
  constructor() {
    this.reindeer = [];
    this.parse = this.parse.bind(this);
  }

  parse(input) {
    var matches = input.match(/can fly (\d+) km\/s for (\d+) seconds, but then must rest for (\d+) seconds./);
    this.reindeer.push(new Reindeer(+matches[1], +matches[2], +matches[3]));
  }

  run(duration) {
    for (let j = 0; j < duration; j += 1) {
      this.reindeer.forEach(deer => deer.update(1));
      this.getLead().forEach(deer => deer.points += 1);
    }
  }

  getLead() {
    var maxDistance = 0;
    return this.reindeer.sort((a, b) => {
      maxDistance = Math.max(maxDistance, a.distance, b.distance);
      return b.distance - a.distance;
    }).filter(deer => deer.distance === maxDistance);
  }
}

module.exports = ReindeerTimer;
