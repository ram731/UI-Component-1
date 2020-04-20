import { Rule, SchematicContext, Tree, apply, mergeWith, template, url, SchematicsException, move } from '@angular-devkit/schematics';
import { strings } from '@angular-devkit/core'

import { parseName} from "@schematics/angular/utility/parse-name";
import { buildDefaultPath} from "@schematics/angular/utility/project";

import { Schema } from './schema';

export function page(_options: Schema): Rule {


  let tree = (tree: Tree, _context: SchematicContext) => {

    const workspaceConfigBuffer = tree.read("angular.json");

    if(!workspaceConfigBuffer){
      throw new SchematicsException("Not an Angular CLI workspace");
    }

    const workspaceConfig = JSON.parse(workspaceConfigBuffer.toString());
    const projectName = _options.project || workspaceConfig.defaultProject;
    const project = workspaceConfig.projects[projectName];
    let defaultProjectPath = buildDefaultPath(project);
    defaultProjectPath = defaultProjectPath + '/pages/';

    const parsedPath = parseName(defaultProjectPath, _options.name);

    const dirs = _options.name.split('/')
    let dirSteps: string = '';

    dirs.forEach( () =>  dirSteps= `../${dirSteps}`)

    let module = '';

    if(dirs.length > 1){
        module = dirs[(dirs.length -2)]
    }

    _options.module = module;
    _options.dirSteps = dirSteps;

    let { name, path } = parsedPath;

    const sourceTemplate = url('./files');

    const sourceParameterizedTemplates = apply( sourceTemplate, [
      template({
        ..._options,
        ...strings,
        name,
        dirSteps
      }),
      move(path)
    ]);

    return mergeWith(sourceParameterizedTemplates)(tree, _context);
  };



  return tree
}


