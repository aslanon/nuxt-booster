import { defineNuxtConfig } from 'nuxt/config';
import { readPackage } from 'read-pkg';

import * as postcssFunctions from './postcss/functions';

const isDev = process.env.NODE_ENV === 'development';

function getBuilder() {
  const builder =
    process.env.npm_config_builder || process.env.BUILDER || undefined;
  return builder === 'webpack' ? '@nuxt/webpack-builder' : undefined;
}

export default defineNuxtConfig(async () => {
  const { repository } = await readPackage();

  return {
    dev: isDev,

    builder: getBuilder(),

    ssr: hasTargetStatic(),

    runtimeConfig: {
      public: {
        githubRepoUrl: repository.url,
        disableInfoLayer: true
      }
    },
    app: {
      baseURL: getBaseUrl()
    },

    devServer: {
      port: getPort(),
      host: getHost()
    },

    build: {
      filenames: {
        app: ({ isDev }) => (isDev ? '[name].js' : '[name].[chunkhash].js'),
        chunk: ({ isDev }) => (isDev ? '[name].js' : '[name].[chunkhash].js')
      }
    },

    postcss: {
      plugins: {
        'postcss-preset-env': {
          preserve: true,
          stage: 0,
          features: {
            'nesting-rules': true
          }
        },
        'postcss-functions': {
          functions: postcssFunctions
        }
      },
      order: 'cssnanoLast'
    },

    generate: {
      dir: getDistPath()
    },

    router: {
      base: getBasePath(),
      strict: undefined
    },

    buildModules: ['@nuxtjs/eslint-module', '@nuxtjs/stylelint-module'].filter(
      v => v
    ),

    speedkit: {
      detection: {
        performance: true,
        browserSupport: true
      },
      performanceMetrics: {
        device: {
          hardwareConcurrency: { min: 2, max: 48 },
          deviceMemory: { min: 2 }
        },
        timing: {
          fcp: 800,
          dcl: 1200 // fallback if fcp is not available (safari)
        }
      },
      fonts: [
        {
          family: 'Quicksand',
          locals: ['Quicksand'],
          fallback: ['sans-serif'],
          variances: [
            {
              style: 'normal',
              weight: 300,
              sources: [
                {
                  src: '@/assets/fonts/quicksand-v21-latin/quicksand-v21-latin-300.woff',
                  type: 'woff'
                },
                {
                  src: '@/assets/fonts/quicksand-v21-latin/quicksand-v21-latin-300.woff2',
                  type: 'woff2'
                }
              ]
            },
            {
              style: 'normal',
              weight: 400,
              sources: [
                {
                  src: '@/assets/fonts/quicksand-v21-latin/quicksand-v21-latin-regular.woff',
                  type: 'woff'
                },
                {
                  src: '@/assets/fonts/quicksand-v21-latin/quicksand-v21-latin-regular.woff2',
                  type: 'woff2'
                }
              ]
            },
            {
              style: 'normal',
              weight: 500,
              sources: [
                {
                  src: '@/assets/fonts/quicksand-v21-latin/quicksand-v21-latin-500.woff',
                  type: 'woff'
                },
                {
                  src: '@/assets/fonts/quicksand-v21-latin/quicksand-v21-latin-500.woff2',
                  type: 'woff2'
                }
              ]
            },
            {
              style: 'normal',
              weight: 600,
              sources: [
                {
                  src: '@/assets/fonts/quicksand-v21-latin/quicksand-v21-latin-600.woff',
                  type: 'woff'
                },
                {
                  src: '@/assets/fonts/quicksand-v21-latin/quicksand-v21-latin-600.woff2',
                  type: 'woff2'
                }
              ]
            },
            {
              style: 'normal',
              weight: 700,
              sources: [
                {
                  src: '@/assets/fonts/quicksand-v21-latin/quicksand-v21-latin-700.woff',
                  type: 'woff'
                },
                {
                  src: '@/assets/fonts/quicksand-v21-latin/quicksand-v21-latin-700.woff2',
                  type: 'woff2'
                }
              ]
            }
          ]
        },
        {
          family: 'Merriweather',
          locals: ['Merriweather'],
          fallback: ['Georgia', 'sans-serif'],
          variances: [
            {
              style: 'normal',
              weight: 300,
              sources: [
                {
                  src: '@/assets/fonts/merriweather-v22-latin/merriweather-v22-latin-300.woff',
                  type: 'woff'
                },
                {
                  src: '@/assets/fonts/merriweather-v22-latin/merriweather-v22-latin-300.woff2',
                  type: 'woff2'
                }
              ]
            },
            {
              style: 'italic',
              weight: 300,
              sources: [
                {
                  src: '@/assets/fonts/merriweather-v22-latin/merriweather-v22-latin-300italic.woff',
                  type: 'woff'
                },
                {
                  src: '@/assets/fonts/merriweather-v22-latin/merriweather-v22-latin-300italic.woff2',
                  type: 'woff2'
                }
              ]
            },
            {
              style: 'normal',
              weight: 400,
              sources: [
                {
                  src: '@/assets/fonts/merriweather-v22-latin/merriweather-v22-latin-regular.woff',
                  type: 'woff'
                },
                {
                  src: '@/assets/fonts/merriweather-v22-latin/merriweather-v22-latin-regular.woff2',
                  type: 'woff2'
                }
              ]
            },
            {
              style: 'italic',
              weight: 400,
              sources: [
                {
                  src: '@/assets/fonts/merriweather-v22-latin/merriweather-v22-latin-italic.woff',
                  type: 'woff'
                },
                {
                  src: '@/assets/fonts/merriweather-v22-latin/merriweather-v22-latin-italic.woff2',
                  type: 'woff2'
                }
              ]
            },
            {
              style: 'normal',
              weight: 700,
              sources: [
                {
                  src: '@/assets/fonts/merriweather-v22-latin/merriweather-v22-latin-700.woff',
                  type: 'woff'
                },
                {
                  src: '@/assets/fonts/merriweather-v22-latin/merriweather-v22-latin-700.woff2',
                  type: 'woff2'
                }
              ]
            },
            {
              style: 'italic',
              weight: 700,
              sources: [
                {
                  src: '@/assets/fonts/merriweather-v22-latin/merriweather-v22-latin-700italic.woff',
                  type: 'woff'
                },
                {
                  src: '@/assets/fonts/merriweather-v22-latin/merriweather-v22-latin-700italic.woff2',
                  type: 'woff2'
                }
              ]
            }
          ]
        },
        {
          family: 'Montserrat Alternates',
          locals: ['Montserrat Alternates', 'Montserrat-Alternates'],
          fallback: ['sans-serif'],
          variances: [
            {
              style: 'normal',
              weight: 300,
              sources: [
                {
                  src: '@/assets/fonts/montserrat-alternates-v12-latin/montserrat-alternates-v12-latin-300.woff',
                  type: 'woff'
                },
                {
                  src: '@/assets/fonts/montserrat-alternates-v12-latin/montserrat-alternates-v12-latin-300.woff2',
                  type: 'woff2'
                }
              ]
            },
            {
              style: 'italic',
              weight: 300,
              sources: [
                {
                  src: '@/assets/fonts/montserrat-alternates-v12-latin/montserrat-alternates-v12-latin-300italic.woff',
                  type: 'woff'
                },
                {
                  src: '@/assets/fonts/montserrat-alternates-v12-latin/montserrat-alternates-v12-latin-300italic.woff2',
                  type: 'woff2'
                }
              ]
            },
            {
              style: 'normal',
              weight: 400,
              sources: [
                {
                  src: '@/assets/fonts/montserrat-alternates-v12-latin/montserrat-alternates-v12-latin-regular.woff',
                  type: 'woff'
                },
                {
                  src: '@/assets/fonts/montserrat-alternates-v12-latin/montserrat-alternates-v12-latin-regular.woff2',
                  type: 'woff2'
                }
              ]
            },
            {
              style: 'italic',
              weight: 400,
              sources: [
                {
                  src: '@/assets/fonts/montserrat-alternates-v12-latin/montserrat-alternates-v12-latin-italic.woff',
                  type: 'woff'
                },
                {
                  src: '@/assets/fonts/montserrat-alternates-v12-latin/montserrat-alternates-v12-latin-italic.woff2',
                  type: 'woff2'
                }
              ]
            },
            {
              style: 'normal',
              weight: 700,
              sources: [
                {
                  src: '@/assets/fonts/montserrat-alternates-v12-latin/montserrat-alternates-v12-latin-700.woff',
                  type: 'woff'
                },
                {
                  src: '@/assets/fonts/montserrat-alternates-v12-latin/montserrat-alternates-v12-latin-700.woff2',
                  type: 'woff2'
                }
              ]
            },
            {
              style: 'italic',
              weight: 700,
              sources: [
                {
                  src: '@/assets/fonts/montserrat-alternates-v12-latin/montserrat-alternates-v12-latin-700italic.woff',
                  type: 'woff'
                },
                {
                  src: '@/assets/fonts/montserrat-alternates-v12-latin/montserrat-alternates-v12-latin-700italic.woff2',
                  type: 'woff2'
                }
              ]
            }
          ]
        }
      ],

      loader: {
        dataUri: '@/assets/spinner/three-circles.svg',
        size: '100px',
        backgroundColor: 'transparent'
      }
    },

    modules: [
      // '@/modules/svg', TODO: fix svg module
      '../src/module'
    ],

    head: {
      htmlAttrs: {
        lang: 'en'
      },
      meta: [
        {
          charset: 'utf-8'
        },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1'
        }
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
    }
  };
});

function getBaseUrl() {
  return process.env.npm_config_base_url || process.env.BASE_URL || '/';
}

function getBasePath() {
  return process.env.npm_config_base || process.env.BASE_PATH || '/';
}

function getHost() {
  return process.env.npm_config_host || process.env.HOST || 'localhost';
}

function getPort() {
  return process.env.npm_config_port || process.env.PORT || 3000;
}

function getDistPath() {
  return process.env.npm_config_dist || process.env.DIST_PATH || 'dist';
}

function hasTargetStatic() {
  return (
    (process.argv.indexOf('--target') &&
      process.argv[process.argv.indexOf('--target') + 1] === 'static') ||
    process.env.npm_config_target_static ||
    process.env.TARGET_STATIC
  );
}
