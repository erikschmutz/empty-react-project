/**
 *
 */

type LoginLinkConfig = GenericLinkConfig<'/login', null>;
type DataLinkConfig = GenericLinkConfig<
    '/data',
    {
        username: string;
    }
>;
type LinkConfig = LoginLinkConfig | DataLinkConfig;

export class Navigator {
    static build(config: LinkConfig) {
        if ('params' in config && config.params !== null) {
            const { params } = config as GenericLinkConfig<
                string,
                Record<string, string>
            >;
            const queryParams = new URLSearchParams();

            for (const key in params) {
                if (params[key]) queryParams.set(key, params[key]);
            }

            return `${config.path}?${queryParams.toString()}`;
        }

        return config.path;
    }
}

/**
 *
 * Static types which help out to ensure we create the correct
 * structure of link config
 */
type Params = Record<string, string> | null;
type ConfigWithParams<T, P extends Params> = {
    path: T;
    params: P;
};
type ConfigWithoutParams<T> = {
    path: T;
};
type GenericLinkConfig<T, P extends Params> = P extends null
    ? ConfigWithoutParams<T>
    : ConfigWithParams<T, P>;
