/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2019
 * @license MIT
 */

import {storiesOf} from '@storybook/react';

import FullDemoComp from './FullDemo';
import {getParams, wrapExample} from '../util/StoriesUtil';

import IntroDoc from './Introduction.md';
import InstallationComp from './Installation.js';
import InstallationDoc from './Installation.md';
import PassingFilesComp from './Passing-files.js';
import PassingFilesDoc from './Passing-files.md';
import DisplayThumbnailsComp from './Display-thumbnails.js';
import DisplayThumbnailsDoc from './Display-thumbnails.md';
import CustomStylingDoc from './Custom-styling.md';
import NotAvailableDoc from './Not-available.md';


storiesOf('Chonky docs', module)
    .add('Introduction', wrapExample(FullDemoComp, 440), getParams(IntroDoc))
    .add('Installation & usage', wrapExample(InstallationComp), getParams(InstallationDoc))
    .add('Passing files to Chonky', wrapExample(PassingFilesComp), getParams(PassingFilesDoc))
    .add('Specifying current folder', wrapExample(), getParams(NotAvailableDoc))
    .add('Generating file descriptions', wrapExample(), getParams(NotAvailableDoc))
    .add('Custom styling', wrapExample(), getParams(CustomStylingDoc))
    .add('Displaying file thumbnails', wrapExample(DisplayThumbnailsComp), getParams(DisplayThumbnailsDoc))
    .add('Handling file actions', wrapExample(), getParams(NotAvailableDoc))
    .add('Managing file selection', wrapExample(), getParams(NotAvailableDoc))
    .add('File browser props', wrapExample(), getParams(NotAvailableDoc));
