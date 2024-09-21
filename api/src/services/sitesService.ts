import Sites from "../schemas/sites";

export class SitesService {

    constructor() { }

    async create(siteParam: Sites) {
        try {
            const site = await Sites.create({
                name: siteParam.name,
                url: siteParam.url,
            });
            return site;
        } catch (error) {
            return error;
        }
    }

    async getAll() {
        try {
            const sites = await Sites.findAll();
            return sites;
        } catch (error) {
            return error;
        }
    }

    async getById(id: number) {
        try {
            const site = await Sites.findByPk(id);
            return site;
        } catch (error) {
            return error;
        }
    }

    async update(siteParam: Sites) {
        try {
            const site = await Sites.findByPk(siteParam.id);
            if (site) {
                site.name = siteParam.name;
                site.url = siteParam.url;
                await site.save();
                return site;
            } else {
                return "Site not found";
            }
        } catch (error) {
            return error;
        }
    }

    async delete(id: number) {
        try {
            const site = await Sites.findByPk(id);
            if (site) {
                await site.destroy();
                return "Site deleted";
            } else {
                return "Site not found";
            }
        } catch (error) {
            return error;
        }
    }

    async deleteAll() {
        try {
            await Sites.destroy({ where: {} });
            return "Sites deleted";
        } catch (error) {
            return error;
        }
    }
}