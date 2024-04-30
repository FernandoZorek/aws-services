/* eslint-disable no-unused-vars */
const AWS = require('aws-sdk');
const { BadRequest, Conflict } = require('@feathersjs/errors');

exports.Domains = class Domains {
  constructor (options, app) {
    this.options = options || {};
    this.app = app;

    const aws = app.get('aws');
    this.awsdomain = aws.domain;
    this.ip = aws.ip;
    this.hostedZoneId = aws.zone;
    this.route53 = new AWS.Route53({
      accessKeyId: aws.accessKeyId,
      secretAccessKey: aws.secretAccessKey,
      region: aws.region
    });
  }

  async find (params) {
    const allZones = await this.route53.listHostedZones().promise();
    const filteredZones = allZones.HostedZones.filter(zone => zone.Name === this.awsdomain + '.');
    const zoneId = filteredZones[0].Id;
    const zoneRecords = await this.route53.listResourceRecordSets({ HostedZoneId: zoneId, MaxItems: '1000' }).promise();
    return zoneRecords.ResourceRecordSets.filter(ref => ref.Type === 'A');
  }

  async get (id, params) {
    return {
      id, text: `A new message with ID: ${id}!`
    };
  }

  async create (data, params) {
    if (!data.subdomain) throw new BadRequest('subdomain is required');
    try {
      const subdomain = await this.route53.changeResourceRecordSets({
        HostedZoneId: this.hostedZoneId,
        ChangeBatch: {
          Changes: [{
            Action: 'CREATE',
            ResourceRecordSet: {
              Name: `${data.subdomain}.${this.awsdomain}`,
              Type: 'A',
              TTL: 300,
              ResourceRecords:
              [
                {
                  Value: this.ip
                }
              ]
            }
          }]
        }
      }).promise();
      return subdomain;
    } catch (e) {
      throw new Conflict(e.message);
    }
  }

  async update (id, data, params) {
    return data;
  }

  async patch (id, data, params) {
    return data;
  }

  async remove (id, params) {
    if (!id) throw new BadRequest('id/subdomain is required');
    try {
      const subdomain = await this.route53.changeResourceRecordSets({
        HostedZoneId: this.hostedZoneId,
        ChangeBatch: {
          Changes: [{
            Action: 'DELETE',
            ResourceRecordSet: {
              Name: `${id}.${this.awsdomain}`,
              Type: 'A',
              TTL: 300,
              ResourceRecords:
              [
                {
                  Value: this.ip
                }
              ]
            }
          }]
        }
      }).promise();
      return subdomain;
    } catch (e) {
      throw new Error(e.message);
    }
  }
};
