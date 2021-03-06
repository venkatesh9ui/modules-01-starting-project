// import { ProjectItem } from './ProjectItem.js';
import { ProjectItem as PrjItem } from './ProjectItem.js';

// import {
//   moveElement,
//   DOMHelper,
//   clearEventListeners
// } from '../Utility/DOMHelper.js';
import * as DOMH from '../Utility/DOMHelper';

// const ProjectItem = 'abc';

// console.log(DEFAULT_VALUE);
// console.log(window); //we will get window object
// console.log(this); // Here we will get undefined because modules also run in strict mode
// console.log(window.DEFAULT_VALUE); // It will not work here because the import PortList is happening beofre app

export class ProjectList {
  // projects = [];

  constructor(type) {
    this.type = type;
    this.projects = [];
    const prjItems = document.querySelectorAll(`#${type}-projects li`);
    for (const prjItem of prjItems) {
      this.projects.push(
        // new ProjectItem(prjItem.id, this.switchProject.bind(this), this.type)
        new PrjItem(prjItem.id, this.switchProject.bind(this), this.type)
      );
    }
    console.log(this.projects);
    this.connectDroppable();
  }

  connectDroppable() {
    // console.log(window.DEFAULT_VALUE);
    console.log(globalThis.DEFAULT_VALUE);
    console.log(globalThis);

    const list = document.querySelector(`#${this.type}-projects ul`);

    list.addEventListener('dragenter', (event) => {
      if (event.dataTransfer.types[0] === 'text/plain') {
        list.parentElement.classList.add('droppable');
        event.preventDefault();
      }
    });

    list.addEventListener('dragover', (event) => {
      if (event.dataTransfer.types[0] === 'text/plain') {
        event.preventDefault();
      }
    });

    list.addEventListener('dragleave', (event) => {
      if (event.relatedTarget.closest(`#${this.type}-projects ul`) !== list) {
        list.parentElement.classList.remove('droppable');
      }
    });

    list.addEventListener('drop', (event) => {
      const prjId = event.dataTransfer.getData('text/plain');
      if (this.projects.find((p) => p.id === prjId)) {
        return;
      }
      document
        .getElementById(prjId)
        .querySelector('button:last-of-type')
        .click();
      list.parentElement.classList.remove('droppable');
      // event.preventDefault(); // not required
    });
  }

  setSwitchHandlerFunction(switchHandlerFunction) {
    this.switchHandler = switchHandlerFunction;
  }

  addProject(project) {
    this.projects.push(project);
    // DOMHelper.moveElement(project.id, `#${this.type}-projects ul`);
    // moveElement(project.id, `#${this.type}-projects ul`);
    DOMH.moveElement(project.id, `#${this.type}-projects ul`);
    project.update(this.switchProject.bind(this), this.type);
  }

  switchProject(projectId) {
    // const projectIndex = this.projects.findIndex(p => p.id === projectId);
    // this.projects.splice(projectIndex, 1);
    this.switchHandler(this.projects.find((p) => p.id === projectId));
    this.projects = this.projects.filter((p) => p.id !== projectId);
  }
}
