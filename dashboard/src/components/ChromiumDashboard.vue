<template>
  <v-data-table
    :headers="headers"
    :items="items"
    hide-actions
    class="elevation-1"
  >
    <template slot="items" slot-scope="props">
      <td>
        <a v-bind:href="props.item.revision_url" target="_blank" style="color:black;">
          {{ props.item.revision }}
        </a>
      </td>

      <td v-if="props.item.android_arm.succeed" bgcolor="green">
        <a v-bind:href="props.item.android_arm.log" target="_blank">log</a>
        <br>
        <a v-bind:href="props.item.android_arm.download" target="_blank">download</a>
      </td>
      <td v-else bgcolor="red">
        <a v-bind:href="props.item.android_arm.log" target="_blank">log</a>
        <br>
        <a v-bind:href="props.item.android_arm.download" target="_blank">download</a>
      </td>

      <td v-if="props.item.android_arm64.succeed" bgcolor="green">
        <a v-bind:href="props.item.android_arm64.log" target="_blank">log</a>
        <br>
        <a v-bind:href="props.item.android_arm64.download" target="_blank">download</a>
      </td>
      <td v-else bgcolor="red">
        <a v-bind:href="props.item.android_arm64.log" target="_blank">log</a>
        <br>
        <a v-bind:href="props.item.android_arm64.download" target="_blank">download</a>
      </td>

      <td v-if="props.item.android_x64.succeed" bgcolor="green">
        <a v-bind:href="props.item.android_x64.log" target="_blank">log</a>
        <br>
        <a v-bind:href="props.item.android_x64.download" target="_blank">download</a>
      </td>
      <td v-else bgcolor="red">
        <a v-bind:href="props.item.android_x64.log" target="_blank">log</a>
        <br>
        <a v-bind:href="props.item.android_x64.download" target="_blank">download</a>
      </td>

      <td v-if="props.item.linux_x64.succeed" bgcolor="green">
        <a v-bind:href="props.item.linux_x64.log" target="_blank">log</a>
        <br>
        <a v-bind:href="props.item.linux_x64.download" target="_blank">download</a>
      </td>
      <td v-else bgcolor="red">
        <a v-bind:href="props.item.linux_x64.log" target="_blank">log</a>
        <br>
        <a v-bind:href="props.item.linux_x64.download" target="_blank">download</a>
      </td>

      <td v-if="props.item.mac_x64.succeed" bgcolor="green">
        <a v-bind:href="props.item.mac_x64.log" target="_blank">log</a>
        <br>
        <a v-bind:href="props.item.mac_x64.download" target="_blank">download</a>
      </td>
      <td v-else bgcolor="red">
        <a v-bind:href="props.item.mac_x64.log" target="_blank">log</a>
        <br>
        <a v-bind:href="props.item.mac_x64.download" target="_blank">download</a>
      </td>

      <td v-if="props.item.win_x64.succeed" bgcolor="green">
        <a v-bind:href="props.item.win_x64.log" target="_blank">log</a>
        <br>
        <a v-bind:href="props.item.win_x64.download" target="_blank">download</a>
      </td>
      <td v-else bgcolor="red">
        <a v-bind:href="props.item.win_x64.log" target="_blank">log</a>
        <br>
        <a v-bind:href="props.item.win_x64.download" target="_blank">download</a>
      </td>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: 'ChromiumDashboard',
  data: () => ({
    headers: [
      {
        text: 'Revision',
        align: 'left',
        sortable: false,
      },
      {
        text: 'Android Arm',
        sortable: false,
      },
      {
        text: 'Android Arm64',
        sortable: false,
      },
      {
        text: 'Android x64',
        sortable: false,
      },
      {
        text: 'Linux x64',
        sortable: false,
      },
      {
        text: 'Mac x64',
        sortable: false,
      },
      {
        text: 'Windows x64',
        sortable: false,
      },
    ],
    items: [
      {
        value: false,
        revision: '2c313f7',
        revision_url: 'https://github.com/otcshare/chromium-src/commit/2c313f7',
        android_arm: {
          succeed: true,
          log: 'http://archive.somewhere.com/public/webml/nightly/2c313f7/android_arm_SUCCEED/chromium_android_arm_2018-04-08.log',
          download: 'http://archive.somewhere.com/public/webml/nightly/2c313f7/android_arm_SUCCEED/ChromePublic.apk',
        },
        android_arm64: {
          succeed: true,
          log: 'http://archive.somewhere.com/public/webml/nightly/2c313f7/android_arm64_SUCCEED/chromium_android_arm64_2018-04-08.log',
          download: 'http://archive.somewhere.com/public/webml/nightly/2c313f7/android_arm64_SUCCEED/ChromePublic.apk',
        },
        android_x64: {
          succeed: true,
          log: 'http://archive.somewhere.com/public/webml/nightly/2c313f7/android_x64_SUCCEED/chromium_android_x64_2018-04-08.log',
          download: 'http://archive.somewhere.com/public/webml/nightly/2c313f7/android_x64_SUCCEED/ChromePublic.apk',
        },
        linux_x64: {
          succeed: true,
          log: 'http://archive.somewhere.com/public/webml/nightly/2c313f7/linux_x64_SUCCEED/chromium_linux_x64_2018-04-09.log',
          download: 'http://archive.somewhere.com/public/webml/nightly/2c313f7/linux_x64_SUCCEED/chromium-browser-unstable_65.0.3324.0-1_amd64.deb',
        },
        mac_x64: {
          succeed: false,
          log: 'http://archive.somewhere.com/public/webml/nightly/2c313f7/mac_x64_FAILED/chromium_mac_x64_2018-04-09.log',
          download: null,
        },
        win_x64: {
          succeed: false,
          log: 'http://archive.somewhere.com/public/webml/nightly/2c313f7/mac_x64_FAILED/chromium_mac_x64_2018-04-09.log',
          download: null,
        },
      },
    ],
  }),
};
</script>

<style>
  a {
    color: white;
  }
</style>
