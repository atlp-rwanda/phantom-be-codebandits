import { AccessControl } from 'accesscontrol';
import grants from './grants.js';
// TODO Replace the object with database models

const accesscontrol = new AccessControl();

accesscontrol.setGrants(grants);
accesscontrol.grant('driver').extend(['user']);
accesscontrol.grant('operator').extend(['user', 'driver']);
accesscontrol.grant('admin').extend(['driver', 'user', 'operator']);

export default accesscontrol;
