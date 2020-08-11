import { getIncident } from '../../backend/models/incident';

/** We need to figure out how we would know which indident to get
 * Will we use Id of logged in/sign up user?
 */

export const getIncidentFromDb = (id) => {
    return getIncident(id)
    .then((incedent) => {
        return incedent;
    })
    .catch((err) => {
        return err;
    })
};
