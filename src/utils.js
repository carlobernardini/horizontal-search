import { flatMap } from 'lodash-es';

export default {
    getFlattenedOptions: (nestedOptions) => ({
        flatOptions: flatMap(nestedOptions, (option) => {
            if (option.children) {
                return option.children;
            }
            return option;
        })
    })
};
